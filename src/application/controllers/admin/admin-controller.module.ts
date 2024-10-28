import { Module } from '@nestjs/common';
import { AdminUseCasesModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AdminUseCasesModule],
  controllers: [AdminController],
})
export class AdminControllerModule {}
