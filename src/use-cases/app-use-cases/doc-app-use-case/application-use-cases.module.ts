import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AdminApplicationUseCaseService } from './application-use-case.service';
import { AdminApplicationFactoryUseCaseService } from './application-factory-use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [AdminApplicationUseCaseService, AdminApplicationFactoryUseCaseService],
  exports: [AdminApplicationUseCaseService, AdminApplicationFactoryUseCaseService],
})
export class AdminApplicationUseCasesModule {}
