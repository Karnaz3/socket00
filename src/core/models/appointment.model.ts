import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { RecordModel } from './record.model';
import { UserModel } from './user.model';

export class AppointmentModel {
  id: number;
  user: UserModel;
  doc: UserModel;
  records: RecordModel[];
  status: ReportStatusEnum;
}
