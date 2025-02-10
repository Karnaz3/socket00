import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';

export class CreateRecordtDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  docId: number;

  @IsOptional()
  @IsString()
  problem: string;

  @IsOptional()
  @IsString()
  solution: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  appointmentId: number;

  @IsOptional()
  @IsEnum(ReportStatusEnum)
  status: ReportStatusEnum;
}
