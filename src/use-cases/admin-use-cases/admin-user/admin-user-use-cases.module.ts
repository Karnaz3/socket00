import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AdminUserFactoryService } from './admin-user-factory.service';
import { AdminUserUseCaseService } from './admin-user-use-case.service';
import { AdminUserAuthUseCaseService } from './admin-user-auth-use-case.service';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { AdminUserInvestorUseCaseService } from './admin-user-investor-usecase.service';

@Module({
  imports: [DataServicesModule, BcryptModule, JwtServiceModule],
  providers: [
    AdminUserFactoryService,
    AdminUserUseCaseService,
    AdminUserAuthUseCaseService,
    AdminUserInvestorUseCaseService,
  ],
  exports: [
    AdminUserFactoryService,
    AdminUserUseCaseService,
    AdminUserAuthUseCaseService,
    AdminUserInvestorUseCaseService,
  ],
})
export class AdminUserUseCasesModule {}
