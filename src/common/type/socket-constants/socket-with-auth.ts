import { Socket } from 'socket.io';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { UserModel } from 'src/core/models/user.model';
import { AdminEntity } from 'src/frameworks/data-services/pg/entities';

export type WsPayload = {
  user?: UserModel;
  isDoctor?: boolean;
  appointment: AppointmentModel;
};
export type WsAuthPayload = {
  authPayload: WsPayload;
};

export type WsWithAuth = Socket & WsAuthPayload;
