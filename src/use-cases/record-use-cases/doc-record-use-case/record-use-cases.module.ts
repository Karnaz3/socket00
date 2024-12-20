import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AdminRecordUseCaseService } from './record-use-case.service';
import { AdminRecordFactoryUseCaseService } from './record-factory-use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [AdminRecordUseCaseService, AdminRecordFactoryUseCaseService],
  exports: [AdminRecordUseCaseService, AdminRecordFactoryUseCaseService],
})
export class AdminRecordUseCasesModule {}
