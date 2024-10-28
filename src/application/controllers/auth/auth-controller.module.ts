import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { AdminUserUseCasesModule } from 'src/use-cases/admin-use-cases/admin-user/admin-user-use-cases.module';
import { IUserUseCaseModule } from 'src/use-cases/admin-use-cases/ipo-investors-use-cases/iuser-use-case.module';
import { AdminAuthController } from './admin-auth.controller';
import { UserAuthController } from './ipo-investors-auth.controller';

@Module({
  imports: [AdminUserUseCasesModule, BcryptModule, IUserUseCaseModule],
  controllers: [AdminAuthController, UserAuthController],
})
export class AuthControllerModule {}
