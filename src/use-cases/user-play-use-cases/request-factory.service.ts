import { Injectable } from '@nestjs/common';
import { PermissionModel } from 'src/core/models/permission.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class GameplayFactoryService {
  constructor() {}

  initiateChallange(pOne: UserModel, pTwo: UserModel) {
    const initiatedChallange = new PermissionModel();
    initiatedChallange.playerOne = pOne;
    initiatedChallange.playerTwo = pTwo;
    initiatedChallange.accepted = false;
    initiatedChallange.playerOneMove = 'x';
    initiatedChallange.playerTwoMove = 'o';
    return initiatedChallange;
  }
  responseChallange(payload) {
    const initiatedChallange = new PermissionModel();
    initiatedChallange.playerOne = payload.playerOne;
    initiatedChallange.playerTwo = payload.playerTwo;
    initiatedChallange.accepted = payload.accepted;
    initiatedChallange.playerOneMove = payload.playerOneMove;
    initiatedChallange.playerTwoMove = payload.playerTwoMove;
    return initiatedChallange;
  }
}
