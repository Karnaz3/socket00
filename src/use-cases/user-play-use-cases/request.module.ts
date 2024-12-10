import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { GameplayUseCaseService } from './request-usecase.service';
import { GameplayFactoryService } from './request-factory.service';
@Module({
  imports: [DataServicesModule],
  providers: [GameplayUseCaseService, GameplayFactoryService],
  exports: [GameplayUseCaseService, GameplayFactoryService],
})
export class GameUsecaseModule {}
