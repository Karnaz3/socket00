import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { InitiateChallengeDto } from 'src/core/dtos/request/challange.dto';
import { PermissionModel } from 'src/core/models/permission.model';
import { GameplayFactoryService } from './request-factory.service';

@Injectable()
export class GameplayUseCaseService {
  constructor(
    private readonly dataService: IDataServices,
    private readonly factoryService: GameplayFactoryService,
  ) {}

  //initiating a request to challange another user
  async initiateChallange(dto: InitiateChallengeDto) {
    const pOne = await this.dataService.user.getOne({ id: dto.playerOneId });
    const pTwo = await this.dataService.user.getOne({ id: dto.playerOneId });
    const permission = this.factoryService.initiateChallange(pOne, pTwo);
    console.log(permission);
    return permission;
  }

  //user may accept or decline the challange
  async acceptOrDeclineChallange(payload: PermissionModel) {
    console.log(payload);
    const permission = this.factoryService.responseChallange(payload);
    console.log(permission);
    return permission;
  }
  async getChallangesHistory(userId: string) {
    return await this.dataService.permission.getAllWithoutPagination({ playerOne: userId });
  }
}
