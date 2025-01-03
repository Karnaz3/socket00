import { Module } from '@nestjs/common';
import { GeneralUserController } from './general.controller';
import { UserUsecaseModule } from 'src/use-cases/actors/user-use-cases/user.module';

@Module({
  imports: [UserUsecaseModule],
  controllers: [GeneralUserController],
})
export class GeneralUserControllerModule {}
