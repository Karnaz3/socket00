import { AppointmentModel } from './appointment.model.js';
import { UserModel } from './user.model';

export class MessageModel {
  id: number;
  content: string;
  sender: UserModel;
  appointment: AppointmentModel;
}
