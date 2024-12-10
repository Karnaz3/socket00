import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { InitiateChallengeDto } from 'src/core/dtos/request/challange.dto';
import { ChatRoomDto, MessageDto } from 'src/core/dtos/request/chat.dto';
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

  constructor(
    private readonly chatUseCaseService: ChatUseCaseService,
    private readonly messageUseCaseService: MessageUseCaseService,
    private readonly userStatusService: GameplayUseCaseService,
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User connected: ${client.id}, User ID: ${userId}`);
    } else {
      client.disconnect();
      this.logger.warn(`User disconnected: ${client.id} due to missing JWT payload.`);
    }
  }

  async handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('startPrivateChat')
  async handleStartPrivateChat(client: any, payload: ChatRoomDto) {
    try {
      const userAId = client.jwtPayload.id;
      // Use ChatUseCaseService to create or get the private chat room
      const room = await this.chatUseCaseService.createSingleChat(payload);

      // Make User A join the room
      client.join(room.id);
      this.logger.log(`User ${userAId} joined private chat room: ${room.id}`);

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

      // Ensure room ID is a string for consistency
      const roomId = room.id.toString();

      client.join(roomId, () => {
        this.logger.log(`User ${userBId} joined private chat room: ${roomId}`);
        this.namespace.to(roomId).emit('userJoined', { userId: userBId, roomId });
      });
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

  @SubscribeMessage('initiateConnection')
  async handleGetMessages(client: any, payload: InitiateChallengeDto) {
    try {
      const data = await this.userStatusService.initiateChallange(payload);
      client.emit('connectionStatus', { message: data });
    } catch (error) {
      this.logger.error(`Failed to start match: ${error.message}`);
      client.emit('error', { message: 'Failed to start match' });
    }
  }
}
