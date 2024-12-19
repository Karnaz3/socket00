import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Namespace } from 'socket.io';
import { InitiateChallengeDto } from 'src/core/dtos/request/challange.dto';
import { ChatRoomDto, MessageDto } from 'src/core/dtos/request/chat.dto';
import { PermissionModel } from 'src/core/models/permission.model';
import { ChatUseCaseService } from 'src/use-cases/chat-usecase/chat-usecase.service';
import { MessageUseCaseService } from 'src/use-cases/message-usecase/message-usecase.service';
import { GameplayUseCaseService } from 'src/use-cases/user-play-use-cases/request-usecase.service';

@WebSocketGateway({
  namespace: '/message-private-chat', // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class PrivateChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(PrivateChatGateway.name);

  private userSocketMap = new Map<number, string>();

  constructor(
    private readonly chatUseCaseService: ChatUseCaseService,
    private readonly messageUseCaseService: MessageUseCaseService,
    private readonly alertStatusService: GameplayUseCaseService,
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    console.log(userId, 'connected to private socket');
    if (userId) {
      this.logger.log(`User status connected: ${client.id}, User ID: ${userId}`);

      // Map the userId to the current socket id
      this.userSocketMap.set(userId, client.id);

      // Notify others that the user is online
      client.broadcast.emit('userOnline', userId);
    } else {
      client.disconnect();
      this.logger.warn(`User disconnected: ${client.id} due to missing JWT payload.`);
    }
  }

  async handleDisconnect(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`Client disconnected: ${client.id}, User ID: ${userId}`);

      // Remove the user from the map
      this.userSocketMap.delete(userId);

      // Notify others that the user is offline
      client.broadcast.emit('userOffline', userId);
    }
  }

  @SubscribeMessage('startPrivateChat')
  async handleStartPrivateChat(client: any, payload: ChatRoomDto) {
    try {
      const userAId = client.jwtPayload.id;
      // Use ChatUseCaseService to create or get the private chat room
      const room = await this.chatUseCaseService.createSingleChat(payload);
      const roomId = room.id.toString();

      // Make User A join the room
      client.join(roomId);
      this.logger.log(`User ${userAId} joined private chat room: ${roomId}`);

      // Notify User A that the room has been successfully joined
      client.emit('privateChatStarted', { roomId: room.id });
    } catch (error) {
      this.logger.error(`Failed to start private chat: ${error.message}`);
      client.emit('error', { message: 'Failed to start private chat' });
    }
  }

  @SubscribeMessage('joinPrivateChat')
  async handleJoinPrivateChat(client: any, payload: { roomId: number }) {
    const parsePayload = typeof payload === 'string' ? JSON.parse(payload) : payload;
    payload = parsePayload;

    try {
      const userBId = client.jwtPayload.id;

      const room = await this.chatUseCaseService.getParticipantsSameRoomSocket(payload.roomId, userBId);

      //// Ensure room ID is a string for consistency
      const roomId = room.id.toString();

      client.join(roomId);
      this.namespace.to(roomId).emit('userJoined', { userId: userBId, roomId });
    } catch (error) {
      this.logger.error(`Failed to join private chat: ${error.message}`);
      client.emit('error', { message: 'Failed to join private chat' });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: any, payload: MessageDto) {
    try {
      const senderId = client.jwtPayload.id;

      payload = typeof payload === 'string' ? JSON.parse(payload) : payload;

      // Save the message using the service
      await this.messageUseCaseService.createMessageSocket(payload, senderId);

      // Use broadcast to emit to everyone except the sender
      const roomId = payload.chatRoomId.toString();
      client.to(roomId).emit('receiveMessage', {
        from: senderId,
        message: payload.content,
      });
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('alert_Request')
  async handleAlert(client: any, payload: InitiateChallengeDto) {
    console.log('alertMessage');
    console.log(payload);
    try {
      payload.playerOneId = client.jwtPayload.id;

      // Initiate challenge in your service
      const data = await this.alertStatusService.initiateChallange({ ...payload });
      console.log(data);

      // Instead of sending to the client who initiated, send to the target player
      const targetSocketId = this.userSocketMap.get(payload.playerTwoId);
      console.log(targetSocketId);
      if (targetSocketId) {
        // Emit the alert request to the target player's socket
        this.namespace.to(targetSocketId).emit('requestResponse', {
          from: client.jwtPayload.name,
          message: data,
        });
      } else {
        console.warn(`Target player (ID: ${payload.playerTwoId}) not online or no socket found.`);
      }
    } catch (error) {
      this.logger.error(`Failed to send public message: ${error.message}`);
      client.emit('error', { message: 'Failed to send public message' });
    }
  }

  @SubscribeMessage('alert_Response')
  async handleAlertResponse(client: any, payload: InitiateChallengeDto) {
    const permissionModel = plainToInstance(PermissionModel, payload);
    const errors = await validate(permissionModel);

    if (errors.length > 0) {
      throw new Error('Invalid payload structure');
    }

    const data = await this.alertStatusService.acceptOrDeclineChallange(permissionModel);
    console.log(data);
    this.namespace.emit('requestResponse', {
      from: client.jwtPayload.name,
      message: data.accepted,
    });
  }
}
