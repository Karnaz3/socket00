import { IsNotEmpty, IsOptional } from 'class-validator';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';

export class CreateApplicationDto {
  @IsNotEmpty()
  userId: number;
  @IsOptional()
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
  docId: number;
  @IsOptional()
  note: string;
  @IsOptional()
  date: Date;
  @IsOptional()
  status: ReportStatusEnum;
}
export class UpdateApplicationUserDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  note: string;
}

export class CreateUserApplicationDto {
  @IsNotEmpty()
  note: string;
}
