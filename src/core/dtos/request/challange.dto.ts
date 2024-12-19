import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class InitiateChallengeDto {
  @IsNotEmpty()
  playerOneId: number;

  @IsNotEmpty()
  playerTwoId: number;

  @IsOptional()
  @IsBoolean()
  accepted: boolean;
}
