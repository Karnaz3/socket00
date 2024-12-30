import { Module } from '@nestjs/common';
import { UserApplicationUseCasesModule } from 'src/use-cases/app-use-cases/user-app-use-case/application-use-cases.module';
import { UserApplicationController } from './user-application.controller';

@Module({
  imports: [UserApplicationUseCasesModule],
  controllers: [UserApplicationController],
})
export class UserApplicationControllerModule {}
