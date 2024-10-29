import { Module } from '@nestjs/common';
import { UserUseCaseModule } from './user/user-use-cases.module';
@Module({
  imports: [UserUseCaseModule],
  exports: [UserUseCaseModule],
})
export class IUserUseCaseModule {}
