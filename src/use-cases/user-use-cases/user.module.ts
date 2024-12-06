import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { UserUseCaseService } from './user-usecase.service';
@Module({
  imports: [DataServicesModule],
  providers: [UserUseCaseService],
  exports: [UserUseCaseService],
})
export class UserUsecaseModule {}
