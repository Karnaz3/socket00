import { Routes } from '@nestjs/core';
import { AdminControllerModule } from './admin/admin-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { UserControllerModule } from './users/user-controller.module';
import { FileUploadControllerModule } from './file-upload/file-upload.module';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/admin',
        children: [AdminControllerModule],
      },
      {
        path: '/users',
        children: [UserControllerModule],
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
