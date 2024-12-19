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
import { GameplayUseCaseService } from 'src/use-cases/user-play-use-cases/request-usecase.service';

@WebSocketGateway({
  namespace: '/request-service', // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class GameplayGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(GameplayGateway.name);

  constructor(
    private readonly userStatusService: GameplayUseCaseService, //private readonly redisService: RedisService, // Inject Redis service for managing status
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User connected: ${client.id}, User ID: ${userId}`);

      // Mark the user as online in the database and Redis
      try {
        // Emit the user online event to inform other clients
        client.emit('gameplaySocketConnected', userId);
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
        // Emit the user offline event to inform other clients
        client.broadcast.emit('gameplaySocketDisconnected', userId);
      } catch (err) {
        this.logger.error(`Error setting user ${userId} as offline`, err);
      }
    }
  }

  @SubscribeMessage('initiate_Request')
  async handleChallange(client: any, payload: InitiateChallengeDto) {
    console.log('initiate_Request');
    console.log(payload);
    try {
      payload.playerOneId = client.jwtPayload.id;
      payload.playerTwoId = payload.playerTwoId;

      //payload = typeof payload === 'string' ? JSON.parse(payload) : payload;

      const data = await this.userStatusService.initiateChallange({ ...payload });
      console.log(data);
      client.emit('requestResponse', {
        from: client.jwtPayload.name,
        message: payload,
      });
    } catch (error) {
      this.logger.error(`Failed to send public message: ${error.message}`);
      client.emit('error', { message: 'Failed to send public message' });
    }
  }
}
