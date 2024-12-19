import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { DocUserUseCaseService } from './doc-user-usecase.service';
@Module({
  imports: [DataServicesModule],
  providers: [DocUserUseCaseService],
  exports: [DocUserUseCaseService],
})
export class DocUserUsecaseModule {}
