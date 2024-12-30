import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { UserApplicationFactoryUseCaseService } from './application-factory-use-case.service';
import { UserApplicationUseCaseService } from './application-use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [UserApplicationUseCaseService, UserApplicationFactoryUseCaseService],
  exports: [UserApplicationUseCaseService, UserApplicationFactoryUseCaseService],
})
export class UserApplicationUseCasesModule {}
