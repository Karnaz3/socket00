import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  password: string;
  avatar: string;
  @IsOptional()
  isVerified: boolean;
  // isGoogleLogin: boolean;
  // googleId: string;
  // googleAccessToken: string;
  // googleRefreshToken: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
  avatar: string;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  id: number;
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
