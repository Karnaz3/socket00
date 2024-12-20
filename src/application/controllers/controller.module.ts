import { Module } from '@nestjs/common';
import { AdminControllerModule, AuthControllerModule } from './';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserControllerModule } from './user-controller/user-controller.module';
import { ChatControllerModule } from './chat-controller/chat-controller.module';
import { DocApplicationControllerModule } from './doc-controller/application-controller/application-controller.module';
import { DocRecordControllerModule } from './doc-controller/record-controller/record-controller.module';
@Module({
  imports: [
    AdminControllerModule,
    AuthControllerModule,
    UserControllerModule,
    FileUploadControllerModule,
    ChatControllerModule,
    DocApplicationControllerModule,
    DocRecordControllerModule,
  ],
  exports: [
    AdminControllerModule,
    AuthControllerModule,
    UserControllerModule,
    FileUploadControllerModule,
    ChatControllerModule,
    DocApplicationControllerModule,
    DocRecordControllerModule,
  ],
})
export class ControllerModule {}
