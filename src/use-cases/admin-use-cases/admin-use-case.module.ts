import { Module } from '@nestjs/common';
import { AdminUserUseCasesModule } from './admin-user/admin-user-use-cases.module';
import { IpoInvestorUseCasesModule } from './ipo-investors-use-cases/ipo-investor-use-case.module';
@Module({
  imports: [AdminUserUseCasesModule, IpoInvestorUseCasesModule],
  exports: [AdminUserUseCasesModule, IpoInvestorUseCasesModule],
})
export class AdminUseCasesModule {}
