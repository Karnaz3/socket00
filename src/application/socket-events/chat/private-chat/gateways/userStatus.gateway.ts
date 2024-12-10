import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { RedisService } from 'src/application/redis/redis.service';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-usecase.service';

@WebSocketGateway({
  namespace: '/user-status', // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class UserStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(UserStatusGateway.name);

  constructor(
    private readonly userStatusService: UserUseCaseService,
    private readonly redisService: RedisService, // Inject Redis service for managing status
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User connected: ${client.id}, User ID: ${userId}`);

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
}
