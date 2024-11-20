import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { PrivateChatGateway } from './gateways/private-chat.gateway';
import { ChatUseCaseModule } from 'src/use-cases/chat-usecase/chat-use-case.module';
import { MessageUseCaseModule } from 'src/use-cases/message-usecase/message-use-case.module';

@Module({
  imports: [DataServicesModule, ChatUseCaseModule, MessageUseCaseModule],
  providers: [PrivateChatGateway],
  exports: [PrivateChatGateway],
})
export class PrivateChatEventModule {}
