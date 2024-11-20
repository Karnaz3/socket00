import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { MessageUseCaseService } from './message-usecase.service';
import { MessageFactoryService } from './message-factory.usecase.service';
@Module({
  imports: [DataServicesModule],
  providers: [MessageFactoryService, MessageUseCaseService],
  exports: [MessageFactoryService, MessageUseCaseService],
})
export class MessageUseCaseModule {}
