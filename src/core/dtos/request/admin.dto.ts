import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApplicationEnum } from 'src/common/enums/application.enum';
import { InvestorPersonalDetailEnum } from 'src/common/enums/investor-personal-detail.enum';

export class CreateAdminDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  avatar: string;
}

export class UpdateAdminDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;

  avatar: string;
}

export class SendTestNotificationDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  message: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  fcmToken: string;
}

export class UpdateAdminPasswordDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  newPassword: string;
}

export class UpdateApplicationStatusDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  @IsEnum(ApplicationEnum)
  status: ApplicationEnum;
}

export class UpdateInvestorApplicationDto {
  @IsNotEmpty()
  investorId: number;
  @IsNotEmpty()
  @IsEnum(InvestorPersonalDetailEnum)
  status: InvestorPersonalDetailEnum;
  @IsOptional()
  remarks: string;
}
