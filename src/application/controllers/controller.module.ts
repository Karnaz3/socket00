import { Module } from '@nestjs/common';
import { AdminControllerModule, AuthControllerModule } from './';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserControllerModule } from './users/user-controller.module';
import { ChatControllerModule } from './chat-controller/chat-controller.module';
@Module({
  imports: [AdminControllerModule, AuthControllerModule, UserControllerModule, FileUploadControllerModule,ChatControllerModule],
  exports: [AdminControllerModule, AuthControllerModule, UserControllerModule, FileUploadControllerModule,ChatControllerModule],
})
export class ControllerModule {}
