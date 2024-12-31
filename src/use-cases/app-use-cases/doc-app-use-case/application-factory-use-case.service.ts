import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/core/dtos/application-request/application.dto';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { RecordModel } from 'src/core/models/record.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class AdminApplicationFactoryUseCaseService {
  constructor() {}

  createApplication(dto: CreateApplicationDto, records?: RecordModel[]): AppointmentModel {
    const appointment = new AppointmentModel();
    if (records) {
      appointment.records = records;
    }
    if (dto.userId) {
      const user = new UserModel();
      user.id = dto.userId;
      appointment.user = user;
    }
    if (dto.docId) {
      const doc = new UserModel();
      doc.id = dto.docId;
      appointment.doc = doc;
    }
    if (dto.note) appointment.note = dto.note;
    if (dto.date) appointment.visitDate = dto.date;
    appointment.requestByDoc = true;
    appointment.status = ReportStatusEnum.CREATED;
    return appointment;
  }

  updateApplication(dto: UpdateApplicationDto): AppointmentModel {
    const model = new AppointmentModel();
    if (dto.docId) {
      const doc = new UserModel();
      doc.id = dto.docId;
      model.doc = doc;
    }
    if (dto.date) model.visitDate = dto.date;
    if (dto.status) model.status = dto.status;
    if (dto.note) model.note = dto.note;
    return model;
  }
}
