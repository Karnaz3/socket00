import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  docId: number;
  @IsNotEmpty()
  note: string;
  @IsNotEmpty()
  date: Date;
}

export class UpdateApplicationDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  note: string;
  @IsOptional()
  date: Date;
  @IsOptional()
  status: string;
}
export class UpdateApplicationUserDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  note: string;
  @IsOptional()
  status: string;
}

export class CreateUserApplicationDto {
  @IsNotEmpty()
  note: string;
}
