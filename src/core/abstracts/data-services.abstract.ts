import { AdminModel } from '../models';
import { FileModel } from '../models/file.model';
import { UserModel } from '../models/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { IAdminRepository } from './repositories/admin.abstract';
import { IUserRepository } from './repositories/user.abstract';

export abstract class IDataServices {
  abstract admin: IAdminRepository<AdminModel>;
  abstract user: IUserRepository<UserModel>;
  abstract file: IGenericRepository<FileModel>;
}
