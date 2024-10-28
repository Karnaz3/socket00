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

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
