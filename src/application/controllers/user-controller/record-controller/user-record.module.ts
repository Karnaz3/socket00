import { Module } from '@nestjs/common';
import { UserRecordUseCasesModule } from 'src/use-cases/record-use-cases/user-record-use-case/record-use-cases.module';
import { UserRecordsController } from './user-record.controller';

@Module({
  imports: [UserRecordUseCasesModule],
  controllers: [UserRecordsController],
})
export class UserRecordControllerModule {}
