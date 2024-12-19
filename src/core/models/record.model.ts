import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { UserModel } from './user.model';
import { AppointmentModel } from './appointment.model';

export class RecordModel {
  id: number;
  user: UserModel;
  doc: UserModel;
  problem: string;
  solution: string;
  appointment: AppointmentModel;
  status: ReportStatusEnum;
}
