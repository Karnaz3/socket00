import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateRecordtDto } from 'src/core/dtos/records-request/record.dto';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { RecordModel } from 'src/core/models/record.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class AdminRecordFactoryUseCaseService {
  constructor() {}

  createReport(dto: CreateRecordtDto, appoint?: AppointmentModel): RecordModel {
    const record = new RecordModel();
    if (dto.userId) {
      const user = new UserModel();
      user.id = dto.userId;
      record.user = user;
    }
    if (dto.docId) {
      const doc = new UserModel();
      doc.id = dto.docId;
      record.doc = doc;
    }
    if (dto.problem) record.problem = dto.problem;
    if (dto.solution) record.solution = dto.solution;
    if (dto.appointmentId) {
      const appointment = new AppointmentModel();
      appointment.id = dto.appointmentId;
      record.appointment = appointment;
      record.title = dto.title || 'Appointment';
    }
    if (appoint) record.appointment = appoint;
    record.status = ReportStatusEnum.RESOLVED;
    return record;
  }

  updateReport(model: RecordModel, dto: CreateRecordtDto): RecordModel {
    if (dto.docId) {
      const doc = new UserModel();
      doc.id = dto.docId;
      model.doc = doc;
    }
    if (dto.title) model.title = dto.title;
    if (dto.problem) model.problem = dto.problem;
    if (dto.solution) model.solution = dto.solution;
    if (dto.status) model.status = dto.status;
    return model;
  }
}
