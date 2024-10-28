import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({
    name: 'full_name',
  })
  name: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

  @Column({
    nullable: true,
    name: 'avatar',
  })
  avatar: string;

  @Column({
    name: 'is_google_login',
    default: false,
    nullable: false,
  })
  isGoogleLogin: boolean;

  @Column({
    name: 'google_id',
    nullable: true,
  })
  googleId: string;

  @Column({
    name: 'google_access_token',
    nullable: true,
  })
  googleAccessToken: string;

  // @Column({
  //   name: 'google_refresh_token',
  //   nullable: true,
  // })
  // googleRefreshToken: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
