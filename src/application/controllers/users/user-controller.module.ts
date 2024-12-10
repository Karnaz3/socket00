import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUsecaseModule } from 'src/use-cases/user-use-cases/user.module';

@Module({
  imports: [UserUsecaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
