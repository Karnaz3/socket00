import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { InitiateChallengeDto } from 'src/core/dtos/request/challange.dto';
import { GameplayFactoryService } from './request-factory.service';

@Injectable()
export class GameplayUseCaseService {
  constructor(
    private readonly dataService: IDataServices,
    private readonly factoryService: GameplayFactoryService,
  ) {}

  async initiateChallange(dto: InitiateChallengeDto) {
    const permission = this.factoryService.initiateChallange(dto);
    //return await this.dataService.permission.create(permission);
    console.log(permission);
    return permission;
  }
  async getChallangesHistory(userId: string) {
    return await this.dataService.permission.getAllWithoutPagination({ playerOne: userId });
  }
}
