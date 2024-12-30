import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AdminApplicationUseCaseService } from './application-use-case.service';
import { AdminApplicationFactoryUseCaseService } from './application-factory-use-case.service';
import { AdminRecordUseCasesModule } from 'src/use-cases/record-use-cases/doc-record-use-case/record-use-cases.module';

@Module({
  imports: [DataServicesModule, AdminRecordUseCasesModule],
  providers: [AdminApplicationUseCaseService, AdminApplicationFactoryUseCaseService],
  exports: [AdminApplicationUseCaseService, AdminApplicationFactoryUseCaseService],
})
export class AdminApplicationUseCasesModule {}
