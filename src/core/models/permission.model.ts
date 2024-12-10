import { UserModel } from './user.model';

export class PermissionModel {
  id: number;
  playerOne: UserModel;
  playerTwo: UserModel;
  accepted: boolean;
  playerOneMove: string;
  playerTwoMove: string;
}
