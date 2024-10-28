import { IsNotEmpty, IsString } from 'class-validator';

export class FileNameChageDto {
  @IsNotEmpty()
  fileId: number;
  @IsNotEmpty()
  @IsString()
  newFileName: string;
}
