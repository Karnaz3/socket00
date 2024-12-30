import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { UserAuthUseCaseService } from './user-auth-use-case.service';
import { UserFactoryService } from './user-factory.service';
import { UserUseCaseService } from './user-use-case.service';

@Module({
  imports: [DataServicesModule, BcryptModule, JwtServiceModule],
  providers: [UserAuthUseCaseService, UserFactoryService, UserUseCaseService],
  exports: [UserAuthUseCaseService, UserFactoryService, UserUseCaseService],
})
export class UserUseCaseModule {}
