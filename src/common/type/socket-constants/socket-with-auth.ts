import { Socket } from 'socket.io';
import { JwtPayload } from 'src/common/interface/jwt-playload.interface';
import { IEventUserJwtPayload } from 'src/core/config/jwt-playload.interface';
import { MessageModel } from 'src/core/models/message.model';
import { UserModel } from 'src/core/models/user.model';
import { AdminEntity } from 'src/frameworks/data-services/pg/entities';

export type WsPayload = {
  adminUser?: AdminEntity;
  eventUser?: UserModel;
  isPublic?: boolean;
  isAdmin?: boolean;
  isUser?: boolean;
  isEventUser?: boolean;
  message?: MessageModel;
};
export type WsAuthPayload = {
  authPayload: WsPayload;
  jwtPayload?: JwtPayload & IEventUserJwtPayload;
};

export type WsWithAuth = Socket & WsAuthPayload;

export type WsQueryParams = {
  eventUser: string;
};
