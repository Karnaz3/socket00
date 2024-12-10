import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { PrivateChatGateway } from './gateways/private-chat.gateway';
import { ChatUseCaseModule } from 'src/use-cases/chat-usecase/chat-use-case.module';
import { MessageUseCaseModule } from 'src/use-cases/message-usecase/message-use-case.module';
import { PublicChatGateway } from './gateways/public-chat.gateway';
import { RedisModule } from 'src/application/redis/redis.module';
import { UserUsecaseModule } from 'src/use-cases/user-use-cases/user.module';
import { UserStatusGateway } from './gateways/userStatus.gateway';
import { GameUsecaseModule } from 'src/use-cases/user-play-use-cases/request.module';

@Module({
  imports: [
    DataServicesModule,
    ChatUseCaseModule,
    MessageUseCaseModule,
    RedisModule,
    UserUsecaseModule,
    GameUsecaseModule,
  ],
  providers: [PrivateChatGateway, PublicChatGateway, UserStatusGateway],
  exports: [PrivateChatGateway, PublicChatGateway, UserStatusGateway],
})
export class PrivateChatEventModule {}
