import { Module } from '@nestjs/common';
import { AdminUserUseCasesModule } from './admin-user/admin-user-use-cases.module';
import { IUserUseCaseModule } from './ipo-investors-use-cases/iuser-use-case.module';
@Module({
  imports: [AdminUserUseCasesModule, IUserUseCaseModule],
  exports: [AdminUserUseCasesModule, IUserUseCaseModule],
})
export class AdminUseCasesModule {}
