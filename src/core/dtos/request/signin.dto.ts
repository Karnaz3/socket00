import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/application/decorators/match.decorator';

export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  MAC = 'MAC',
  LINUX = 'LINUX',
  WINDOWS = 'WINDOWS',
  SMART_TV = 'SMART_TV',
  WEARABLE = 'WEARABLE',
}

export class SigninDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class FcmTokenDto {
  deviceId: string;
  deviceType: string;
  fcmToken: string;
}

export class SigninWithGoogleDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  confirmPassword: string;
}

export class CheckTokenDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  token: string;
}
