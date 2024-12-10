import { Module } from '@nestjs/common';
import { ChatUseCaseModule } from 'src/use-cases/chat-usecase/chat-use-case.module';
import { ChatController } from './chat-controller';
import { MessageUseCaseModule } from 'src/use-cases/message-usecase/message-use-case.module';
import { PrivateMessageController } from './private-message-controller';

@Module({
  imports: [ChatUseCaseModule, MessageUseCaseModule],
  controllers: [ChatController, PrivateMessageController],
})
export class ChatControllerModule {}
