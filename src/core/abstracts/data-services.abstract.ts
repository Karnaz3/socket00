import { AdminModel } from '../models';
import { AppointmentModel } from '../models/appointment.model';
import { ChatRoomModel } from '../models/chat-room.model.ts';
import { FileModel } from '../models/file.model';
import { MessageModel } from '../models/message.model';
import { PermissionModel } from '../models/permission.model';
import { RecordModel } from '../models/record.model';
import { UserModel } from '../models/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { IAdminRepository } from './repositories/admin.abstract';
import { IUserRepository } from './repositories/user.abstract';

export abstract class IDataServices {
  abstract admin: IAdminRepository<AdminModel>;
  abstract user: IUserRepository<UserModel>;
  abstract file: IGenericRepository<FileModel>;
  abstract message: IGenericRepository<MessageModel>;
  abstract chatRoom: IGenericRepository<ChatRoomModel>;
  abstract permission: IGenericRepository<PermissionModel>;
  abstract record: IGenericRepository<RecordModel>;
  abstract appointment: IGenericRepository<AppointmentModel>;
}
