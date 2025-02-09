import { Routes } from '@nestjs/core';
import { AdminControllerModule } from './admin/admin-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { DocApplicationControllerModule } from './doc-controller/application-controller/application-controller.module';
import { GeneralDocControllerModule } from './doc-controller/general-controller/general.module';
import { DocRecordControllerModule } from './doc-controller/record-controller/record-controller.module';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserApplicationControllerModule } from './user-controller/application-controller/user-application.module';
import { GeneralUserControllerModule } from './user-controller/general-controller/general.module';
import { UserRecordControllerModule } from './user-controller/record-controller/user-record.module';
import { UserControllerModule } from './user-controller/user-controller.module';
import { MedicationControllerModule } from './doc-controller/medication-controller/medication-controller.module';
import { MedicationControllerModuleUser } from './user-controller/medication-controller/medication-controller.module';

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
        children: [
          DocApplicationControllerModule,
          DocRecordControllerModule,
          GeneralDocControllerModule,
          MedicationControllerModule,
        ],
      },
      {
        path: '/user',
        children: [
          UserControllerModule,
          UserApplicationControllerModule,
          UserRecordControllerModule,
          GeneralUserControllerModule,
          MedicationControllerModuleUser,
        ],
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
