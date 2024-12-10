import { IsBoolean, IsNotEmpty } from 'class-validator';

export class InitiateChallengeDto {
  @IsNotEmpty()
  playerOneId: number;

  @IsNotEmpty()
  playerTwoId: number;

  @IsNotEmpty()
  @IsBoolean()
  accepted: boolean;
}
