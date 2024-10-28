import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { UploadFileUseCaseService } from './uploadfile-usecase.service';
import { UploadFileService } from './file-upload.service';
@Module({
  imports: [DataServicesModule],
  providers: [UploadFileUseCaseService, UploadFileService],
  exports: [UploadFileUseCaseService, UploadFileService],
})
export class FileUploadusecaseModule {}
