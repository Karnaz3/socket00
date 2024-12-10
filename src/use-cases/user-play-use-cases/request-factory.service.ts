import { Injectable } from '@nestjs/common';
import { InitiateChallengeDto } from 'src/core/dtos/request/challange.dto';
import { PermissionModel } from 'src/core/models/permission.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class GameplayFactoryService {
  constructor() {}

  initiateChallange(dto: InitiateChallengeDto) {
    const initiatedChallange = new PermissionModel();
    if (dto.playerOneId) {
      const playerOne = new UserModel();
      playerOne.id = dto.playerOneId;
      initiatedChallange.playerOne = playerOne;
    }
    if (dto.playerTwoId) {
      const playerTwo = new UserModel();
      playerTwo.id = dto.playerTwoId;
      initiatedChallange.playerTwo = playerTwo;
    }
    initiatedChallange.accepted = dto.accepted;
    initiatedChallange.playerOneMove = 'x';
    initiatedChallange.playerTwoMove = 'o';
    return initiatedChallange;
  }
}
