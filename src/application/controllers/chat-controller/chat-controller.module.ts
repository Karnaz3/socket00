import { Module } from '@nestjs/common';
import { ChatUseCaseModule } from 'src/use-cases/chat-usecase/chat-use-case.module';
import { ChatController } from './chat-controller';

@Module({
  imports: [ChatUseCaseModule],
  controllers: [ChatController],
})
export class ChatControllerModule {}
