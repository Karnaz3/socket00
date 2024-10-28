import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { UserAuthUseCaseService } from './ipo-investor-auth-use-case.service';
import { UserFactoryService } from './ipo-investor-factory.service';
import { IpoInvestorUseCaseService } from './ipo-investor-use-case.service';

@Module({
  imports: [DataServicesModule, BcryptModule, JwtServiceModule],
  providers: [UserAuthUseCaseService, UserFactoryService, IpoInvestorUseCaseService],
  exports: [UserAuthUseCaseService, UserFactoryService, IpoInvestorUseCaseService],
})
export class IpoInvestorUserUseCaseModule {}
