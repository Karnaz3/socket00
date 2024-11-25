import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatUseCaseService } from 'src/use-cases/chat-usecase/chat-usecase.service';
import { MessageUseCaseService } from 'src/use-cases/message-usecase/message-usecase.service';

@WebSocketGateway({
  namespace: '/message-public-caht', // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class PublicChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(PublicChatGateway.name);

  constructor(
    private readonly chatUseCaseService: ChatUseCaseService,
    private readonly messageUseCaseService: MessageUseCaseService,
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

  @SubscribeMessage('startPublicChat')
  async handleStartPrivateChat(client: any) {
    try {
      const userAId = client.jwtPayload.id;
      // Use ChatUseCaseService to create or get the private chat room
      const room = await this.chatUseCaseService.getGlobalChatRoom();
      // Make User A join the room
      client.join(room.id);
      this.logger.log(`User ${userAId} joined public chat room: ${room.id}`);

      // Notify User A that the room has been successfully joined
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

      // Make the client join the room
      client.join(roomId, () => {
        this.logger.log(`User ${userBId} joined public chat room: ${roomId}`);
        this.logger.log(
          `Current clients in room ${roomId}: ${JSON.stringify([...(this.namespace.adapter.rooms.get(roomId) || [])])}`,
        );

        // Notify all users in the room about the new user
        this.namespace.to(roomId).emit('userJoinedPublic', {
          userId: userBId,
          roomId,
        });
      });
    } catch (error) {
      this.logger.error(`Failed to join public chat: ${error.message}`);
      client.emit('error', { message: 'Failed to join public chat' });
    }
  }

  @SubscribeMessage('sendPublicMessage')
  async handleMessage(client: any, payload: MessageDto) {
    try {
      const senderId = client.jwtPayload.id;
      payload = typeof payload === 'string' ? JSON.parse(payload) : payload;

      const roomId = payload.chatRoomId.toString();
      this.logger.log(`Sender ID: ${senderId}, Room ID: ${roomId}`);
      this.logger.log(
        `Current clients in room ${roomId}: ${JSON.stringify([...(this.namespace.adapter.rooms.get(roomId) || [])])}`,
      );

      // Save the message using the service
      await this.messageUseCaseService.createMessagePublicSocket(payload, senderId);
      // Emit to all users in the room
      client.to(roomId).emit('receivePublicMessage', {
        from: senderId,
        message: payload.content,
      });
    } catch (error) {
      this.logger.error(`Failed to send public message: ${error.message}`);
      client.emit('error', { message: 'Failed to send public message' });
    }
  }

  //@SubscribeMessage('getMessages')
  //async handleGetMessages(client: any, payload: { roomId: number }) {
  //  try {
  //    // Use MessageUseCaseService to get all messages for the room
  //    const messages = await this.messageUseCaseService.getMessagesSocket(payload.roomId, client.jwtPayload.id);

  //    // Send messages back to the client
  //    client.emit('messages', { roomId: payload.roomId, messages });
  //  } catch (error) {
  //    this.logger.error(`Failed to get messages: ${error.message}`);
  //    client.emit('error', { message: 'Failed to get messages' });
  //  }
  //}
}
