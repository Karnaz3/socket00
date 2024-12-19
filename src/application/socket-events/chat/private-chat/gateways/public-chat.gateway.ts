import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { RedisService } from 'src/application/redis/redis.service';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatUseCaseService } from 'src/use-cases/chat-usecase/chat-usecase.service';
import { MessageUseCaseService } from 'src/use-cases/message-usecase/message-usecase.service';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-usecase.service';

@WebSocketGateway({
  namespace: '/message-public-chat', // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class PublicChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(PublicChatGateway.name);

  constructor(
    private readonly chatUseCaseService: ChatUseCaseService,
    private readonly messageUseCaseService: MessageUseCaseService,
    private readonly userStatusService: UserUseCaseService,
    private readonly redisService: RedisService, // Inject Redis service for managing status
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User public chat connected: ${client.id}, User ID: ${userId}`);

      // Mark the user as online in the database and Redis
      try {
        await this.userStatusService.setUserOnline(userId); // Update database
        await this.redisService.setUserOnline(userId); // Update Redis

        // Emit the user online event to inform other clients
        client.broadcast.emit('userOnline', userId); // Broadcast to others
      } catch (err) {
        this.logger.error(`Error setting user ${userId} as online`, err);
      }
    } else {
      client.disconnect();
      this.logger.warn(`User disconnected: ${client.id} due to missing JWT payload.`);
    }
  }

  async handleDisconnect(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`Client disconnected: ${client.id}, User ID: ${userId}`);

      // Mark the user as offline in the database and Redis
      try {
        await this.userStatusService.setUserOffLine(userId); // Update database
        await this.redisService.setUserOffline(userId); // Update Redis

        // Emit the user offline event to inform other clients
        client.broadcast.emit('userOffline', userId);
      } catch (err) {
        this.logger.error(`Error setting user ${userId} as offline`, err);
      }
    }
  }

  @SubscribeMessage('startPublicChat')
  async handleStartPublicChat(client: any) {
    try {
      const userAId = client.jwtPayload.id;
      const room = await this.chatUseCaseService.getGlobalChatRoom();
      client.join(room.id);
      this.logger.log(`User ${userAId} Start public chat room: ${room.id}`);

      client.emit('publicChatStarted', { roomId: room.id });
    } catch (error) {
      this.logger.error(`Failed to start public chat: ${error.message}`);
      client.emit('error', { message: 'Failed to start public chat' });
    }
  }

  @SubscribeMessage('joinPublicChat')
  async handleJoinPublicChat(client: any) {
    try {
      const userBId = client.jwtPayload.id;
      const room = await this.chatUseCaseService.getGlobalChatRoom();
      const roomId = room.id.toString();

      client.join(roomId);
      this.logger.log(`User ${userBId} joined public chat room: ${roomId}`);

      this.namespace.emit('userJoinedPublic', { userId: userBId, roomId });
    } catch (error) {
      this.logger.error(`Failed to join public chat: ${error.message}`);
      client.emit('error', { message: 'Failed to join public chat' });
    }
  }

  @SubscribeMessage('sendPublicMessage')
  async handleMessage(client: any, payload: MessageDto) {
    try {
      const senderId = client.jwtPayload.id;
      const senderName = client.jwtPayload.name;
      payload = typeof payload === 'string' ? JSON.parse(payload) : payload;

      const roomId = payload.chatRoomId.toString();
      this.logger.log(`Sender ID: ${senderId}, Room ID: ${roomId}`);

      // Save the message using the service
      await this.messageUseCaseService.createMessagePublicSocket(payload, senderId);
      client.to(roomId).emit('receivePublicMessage', {
        from: senderName,
        message: payload.content,
      });
    } catch (error) {
      this.logger.error(`Failed to send public message: ${error.message}`);
      client.emit('error', { message: 'Failed to send public message' });
    }
  }
}
