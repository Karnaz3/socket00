import { Module } from '@nestjs/common';
import { FileUploadusecaseModule } from 'src/use-cases/upload-file/upload-file.module';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [FileUploadusecaseModule],
  controllers: [FileUploadController],
})
export class FileUploadControllerModule {}
