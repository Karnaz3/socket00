import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AppClsStore, IUserClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { UserModel } from 'src/core/models/user.model';
import { Not } from 'typeorm';

@Injectable()
export class UserUseCaseService {
  constructor(
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async getAllUsers() {
    const user = this.cls.get<IUserClsData>('user');
    return await this.dataService.user.getAllWithoutPagination({
      id: Not(user.id),
      isAdmin: false,
    });
  }

  async setUserOnline() {
    const user = this.cls.get<IUserClsData>('user');
    return await this.dataService.user.update({ id: user.id }, { isOnline: true } as UserModel);
  }

  async setUserOffLine() {
    const user = this.cls.get<IUserClsData>('user');
    return await this.dataService.user.update({ id: user.id }, { isOnline: false } as UserModel);
  }

  async getOnlineUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: true,
      isAdmin: false,
      id: Not(this.cls.get<IUserClsData>('user').id),
    });
  }

  async getOfflineUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: false,
      isAdmin: false,
      id: Not(this.cls.get<IUserClsData>('user').id),
    });
  }
}
