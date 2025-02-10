import { Module } from '@nestjs/common';
import { DocUserUsecaseModule } from 'src/use-cases/actors/doc-user-use-cases/doc-user.module';
import { AdminUseCasesModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin-controller';

@Module({
  imports: [AdminUseCasesModule, DocUserUsecaseModule],
  controllers: [AdminController],
})
export class AdminControllerModule {}
