import { Module } from '@nestjs/common';
import { AdminControllerModule, AuthControllerModule } from './';
import { FileUploadControllerModule } from './file-upload/file-upload.module';
import { UserControllerModule } from './user-controller/user-controller.module';
import { DocApplicationControllerModule } from './doc-controller/application-controller/application-controller.module';
import { DocRecordControllerModule } from './doc-controller/record-controller/record-controller.module';
import { UserApplicationControllerModule } from './user-controller/application-controller/user-application.module';
import { UserRecordControllerModule } from './user-controller/record-controller/user-record.module';
import { GeneralDocControllerModule } from './doc-controller/general-controller/general.module';
import { GeneralUserControllerModule } from './user-controller/general-controller/general.module';
import { MedicationControllerModule } from './doc-controller/medication-controller/medication-controller.module';
import { MedicationControllerModuleUser } from './user-controller/medication-controller/medication-controller.module';
@Module({
  imports: [
    AdminControllerModule,
    AuthControllerModule,
    UserControllerModule,
    FileUploadControllerModule,
    DocApplicationControllerModule,
    DocRecordControllerModule,
    UserApplicationControllerModule,
    UserRecordControllerModule,
    GeneralDocControllerModule,
    GeneralUserControllerModule,
    MedicationControllerModule,
    MedicationControllerModuleUser,
  ],
  exports: [
    AdminControllerModule,
    AuthControllerModule,
    UserControllerModule,
    FileUploadControllerModule,
    DocApplicationControllerModule,
    DocRecordControllerModule,
    UserApplicationControllerModule,
    UserRecordControllerModule,
    GeneralDocControllerModule,
    GeneralUserControllerModule,
    MedicationControllerModule,
    MedicationControllerModuleUser,
  ],
})
export class ControllerModule {}
