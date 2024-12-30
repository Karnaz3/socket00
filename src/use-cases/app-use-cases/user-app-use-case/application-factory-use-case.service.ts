import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateUserApplicationDto } from 'src/core/dtos/application-request/application.dto';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class UserApplicationFactoryUseCaseService {
  constructor() {}

  //create by user
  createApplication(dto: CreateUserApplicationDto, userModel: UserModel): AppointmentModel {
    const appointment = new AppointmentModel();
    if (!userModel) return null;
    appointment.user = userModel;
    if (dto.note) appointment.note = dto.note;
    appointment.requestByDoc = false;
    appointment.status = ReportStatusEnum.CREATED;
    return appointment;
  }

  updateApplication(model: AppointmentModel, dto): AppointmentModel {
    if (dto.status) model.status = dto.status;
    if (dto.note) model.note = dto.note;
    return model;
  }
  // update by admin doc
  //updateApplication(model: AppointmentModel, dto): AppointmentModel {
  //  if (dto.docId) {
  //    const doc = new UserModel();
  //    doc.id = dto.docId;
  //    model.doc = doc;
  //  }
  //  if (dto.date) model.visitDate = dto.date;
  //  if (dto.status) model.status = dto.status;
  //  if (dto.note) model.note = dto.note;
  //  if (dto.records) {
  //    dto.records.forEach((recordId: number) => {
  //      const newRecord = new RecordModel();
  //      newRecord.id = recordId;
  //      model.records.push(newRecord);
  //    });
  //  }
  //  return model;
  //}
}
