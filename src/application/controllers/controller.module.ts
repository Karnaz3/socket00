import { Module } from '@nestjs/common';
import { AdminControllerModule, AuthControllerModule } from './';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserControllerModule } from './ipo-investors/user-controller.module';
@Module({
  imports: [AdminControllerModule, AuthControllerModule, UserControllerModule, FileUploadControllerModule],
  exports: [AdminControllerModule, AuthControllerModule, UserControllerModule, FileUploadControllerModule],
})
export class ControllerModule {}
