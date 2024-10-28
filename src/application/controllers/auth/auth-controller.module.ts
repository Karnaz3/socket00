import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { AdminUserUseCasesModule } from 'src/use-cases/admin-use-cases/admin-user/admin-user-use-cases.module';
import { IpoInvestorUseCasesModule } from 'src/use-cases/admin-use-cases/ipo-investors-use-cases/ipo-investor-use-case.module';
import { AdminAuthController } from './admin-auth.controller';
import { UserAuthController } from './ipo-investors-auth.controller';

@Module({
  imports: [AdminUserUseCasesModule, BcryptModule, IpoInvestorUseCasesModule],
  controllers: [AdminAuthController, UserAuthController],
})
export class AuthControllerModule {}
