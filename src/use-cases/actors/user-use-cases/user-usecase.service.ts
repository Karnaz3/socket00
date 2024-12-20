import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { Not } from 'typeorm';

@Injectable()
export class UserUseCaseService {
  constructor(private readonly dataService: IDataServices) {}

  async getAllUsers(dto: { userId: string }) {
    return await this.dataService.user.getAll({
      id: Not(dto.userId),
    });
  }

  async setUserOnline(userId: string) {
    const user = await this.dataService.user.getOne({ id: userId });
    user.isOnline = true;
    return await this.dataService.user.update({ id: userId }, user);
  }

  async setUserOffLine(userId: string) {
    const user = await this.dataService.user.getOne({ id: userId });
    user.isOnline = false;
    return await this.dataService.user.update({ id: userId }, user);
  }

  async getOnlineUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: true,
    });
  }

  async getOfflineUsers() {
    return await this.dataService.user.getAllWithoutPagination({
      isOnline: false,
    });
  }
}
