import { Module } from '@nestjs/common';
import { AdminRecordUseCasesModule } from 'src/use-cases/record-use-cases/doc-record-use-case/record-use-cases.module';
import { DocRecordController } from './record.controller';

@Module({
  imports: [AdminRecordUseCasesModule],
  controllers: [DocRecordController],
})
export class DocRecordControllerModule {}
