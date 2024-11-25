import { Module } from '@nestjs/common';
import { AdminUserUseCasesModule } from './admin-user/admin-user-use-cases.module';
import { IUserUseCaseModule } from './user-usecase/iuser-use-case.module';
@Module({
  imports: [AdminUserUseCasesModule, IUserUseCaseModule],
  exports: [AdminUserUseCasesModule, IUserUseCaseModule],
})
export class AdminUseCasesModule {}
