import { AdminModel } from '../models';
import { ChatRoomModel } from '../models/chat-room.model.ts';
import { FileModel } from '../models/file.model';
import { MessageModel } from '../models/message.model';
// import { ParticipantsModel } from '../models/participants.model';
import { UserModel } from '../models/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { IAdminRepository } from './repositories/admin.abstract';
import { IUserRepository } from './repositories/user.abstract';

export abstract class IDataServices {
  abstract admin: IAdminRepository<AdminModel>;
  abstract user: IUserRepository<UserModel>;
  abstract file: IGenericRepository<FileModel>;
  abstract message: IGenericRepository<MessageModel>;
  // abstract participant: IGenericRepository<ParticipantsModel>;
  abstract chatRoom: IGenericRepository<ChatRoomModel>;
}
