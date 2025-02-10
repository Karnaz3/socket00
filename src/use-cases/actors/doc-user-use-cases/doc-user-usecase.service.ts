import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AppClsStore, IDocClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { UserModel } from 'src/core/models/user.model';
import { Not } from 'typeorm';

@Injectable()
export class DocUserUseCaseService {
  constructor(
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}
  //get all docs except the self user
  async getAllDocUsers() {
    const user = this.cls.get<IDocClsData>('doc');
    if (!user || user === undefined) {
      return await this.dataService.user.getAllWithoutPagination({
        isAdmin: true,
      });
    }
    return await this.dataService.user.getAllWithoutPagination({
      id: Not(user.id),
      isAdmin: true,
    });
  }

  async setUserOnline() {
    const user = this.cls.get<IDocClsData>('doc');
    return await this.dataService.user.update({ id: user.id }, { isOnline: true } as UserModel);
  }

  async setUserOffLine() {
    const user = this.cls.get<IDocClsData>('doc');
    return await this.dataService.user.update({ id: user.id }, { isOnline: false } as UserModel);
  }

  //get all online doc users
  async getOnlinDoceUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: true,
      isAdmin: true,
      id: Not(this.cls.get<IDocClsData>('doc').id),
    });
  }

  async getOfflineDocUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: false,
      isAdmin: true,
      id: Not(this.cls.get<IDocClsData>('doc').id),
    });
  }

  async getUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isAdmin: false,
    });
  }
}
