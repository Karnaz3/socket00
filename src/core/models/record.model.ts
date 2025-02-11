import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { UserModel } from './user.model';
import { AppointmentModel } from './appointment.model';
import { MedicationModel } from './medication.model';

export class RecordModel {
  id: number;
  title: string;
  user: UserModel;
  doc: UserModel;
  problem: string;
  solution: string;
  appointment: AppointmentModel;
  status: ReportStatusEnum;
  medication: MedicationModel;
}
