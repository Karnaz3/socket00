import { Routes } from '@nestjs/core';
import { AdminControllerModule } from './admin/admin-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { ChatControllerModule } from './chat-controller/chat-controller.module';
import { DocApplicationControllerModule } from './doc-controller/application-controller/application-controller.module';
import { DocRecordControllerModule } from './doc-controller/record-controller/record-controller.module';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserControllerModule } from './user-controller/user-controller.module';

const routes: Routes = [
  {
    path: '/',
    children: [
      {
        path: '/admin',
        children: [AdminControllerModule],
      },
      {
        path: '/doc',
        children: [DocApplicationControllerModule, DocRecordControllerModule],
      },
      {
        path: '/users',
        children: [UserControllerModule],
      },
      {
        path: '/chat',
        children: [ChatControllerModule],
      },
      {
        path: '/upload',
        children: [FileUploadControllerModule],
      },
    ],
  },
  {
    path: '/auth',
    children: [AuthControllerModule],
  },
];

export default routes;
