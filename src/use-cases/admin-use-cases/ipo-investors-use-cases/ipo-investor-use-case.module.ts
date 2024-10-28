import { Module } from '@nestjs/common';
import { IpoInvestorUserUseCaseModule } from './ipo-investor/ipo-investor-use-cases.module';
// import { FirebaseModule } from 'src/common/modules/firebase/firebase.module';
@Module({
  imports: [IpoInvestorUserUseCaseModule],
  exports: [IpoInvestorUserUseCaseModule],
})
export class IpoInvestorUseCasesModule {}
