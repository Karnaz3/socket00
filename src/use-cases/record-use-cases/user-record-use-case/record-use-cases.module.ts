import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { UserRecordUseCaseService } from './record-use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [UserRecordUseCaseService],
  exports: [UserRecordUseCaseService],
})
export class UserRecordUseCasesModule {}
