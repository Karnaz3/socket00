import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { RedisService } from 'src/application/redis/redis.service';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-usecase.service';

@WebSocketGateway({
  namespace: '/user-status',
  transport: ['websocket'],
})
export class UserStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(UserStatusGateway.name);

  constructor(
    private readonly userStatusService: UserUseCaseService,
    private readonly redisService: RedisService,
  ) {}

  async handleConnection(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User status connected: ${client.id}, User ID: ${userId}`);

      // Mark the user as online
      await this.userStatusService.setUserOnline(userId);
      await this.redisService.setUserOnline(userId);

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

      // Mark the user as offline
      await this.userStatusService.setUserOffLine(userId);
      await this.redisService.setUserOffline(userId);

      // Notify others that the user is offline
      client.broadcast.emit('userOffline', userId);
    }
  }
}
