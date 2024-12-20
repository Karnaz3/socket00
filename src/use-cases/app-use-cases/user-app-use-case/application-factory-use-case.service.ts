import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateUserApplicationDto } from 'src/core/dtos/application-request/application.dto';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { RecordModel } from 'src/core/models/record.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class UserApplicationFactoryUseCaseService {
  constructor() {}

  //create by user
  createApplication(dto: CreateUserApplicationDto): AppointmentModel {
    const appointment = new AppointmentModel();
    if (dto.userId) {
      const user = new UserModel();
      user.id = dto.userId;
      appointment.user = user;
    }
    if (dto.note) appointment.note = dto.note;
    appointment.requestByDoc = false;
    appointment.status = ReportStatusEnum.CREATED;
    return appointment;
  }

  // update by admin doc
  updateApplication(model: AppointmentModel, dto): AppointmentModel {
    if (dto.docId) {
      const doc = new UserModel();
      doc.id = dto.docId;
      model.doc = doc;
    }
    if (dto.date) model.visitDate = dto.date;
    if (dto.status) model.status = dto.status;
    if (dto.note) model.note = dto.note;
    if (dto.records) {
      dto.records.forEach((recordId: number) => {
        const newRecord = new RecordModel();
        newRecord.id = recordId;
        model.records.push(newRecord);
      });
    }
    return model;
  }
}
