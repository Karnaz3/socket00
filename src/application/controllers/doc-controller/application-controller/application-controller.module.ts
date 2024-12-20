import { Module } from '@nestjs/common';
import { AdminApplicationUseCasesModule } from 'src/use-cases/app-use-cases/doc-app-use-case/application-use-cases.module';
import { DocApplicationController } from './application.controller';

@Module({
  imports: [AdminApplicationUseCasesModule],
  controllers: [DocApplicationController],
})
export class DocApplicationControllerModule {}
