import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { UserApplicationUseCaseService } from './application-use-case.service';
import { UserApplicationFactoryUseCaseService } from './application-factory-use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [UserApplicationUseCaseService, UserApplicationFactoryUseCaseService],
  exports: [UserApplicationUseCaseService, UserApplicationFactoryUseCaseService],
})
export class UserApplicationUseCasesModule {}
