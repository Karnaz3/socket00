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
    appointment.title = 'Appointment by User';
    return appointment;
  }

  updateApplication(model: AppointmentModel, dto): AppointmentModel {
    if (dto.note) model.note = dto.note;
    return model;
  }
}
