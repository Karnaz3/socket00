import { Module } from '@nestjs/common';
import { GeneralDocController } from './general.controller';
import { DocUserUsecaseModule } from 'src/use-cases/actors/doc-user-use-cases/doc-user.module';

@Module({
  imports: [DocUserUsecaseModule],
  controllers: [GeneralDocController],
})
export class GeneralDocControllerModule {}
