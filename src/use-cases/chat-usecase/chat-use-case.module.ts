import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { ChatFactoryService } from './chat-factory.usecase.service';
@Module({
  imports: [DataServicesModule],
  providers: [ChatFactoryService],
  exports: [ChatFactoryService],
})
export class ChatUseCaseModule {}