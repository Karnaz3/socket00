import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { ChatFactoryService } from './chat-factory.usecase.service';
import { ChatUseCaseService } from './chat-usecase.service';
@Module({
  imports: [DataServicesModule],
  providers: [ChatFactoryService, ChatUseCaseService],
  exports: [ChatFactoryService, ChatUseCaseService],
})
export class ChatUseCaseModule {}
