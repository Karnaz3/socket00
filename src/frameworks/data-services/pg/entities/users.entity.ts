import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChatRoomEntity } from './chat-room.entity';

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
    name: 'is_online',
    default: false,
  })
  isOnline: boolean;

  @Column({
    nullable: true,
    name: 'avatar',
  })
  avatar: string;

  @Column({
    name: 'is_admin',
    default: false,
  })
  isAdmin: boolean;

  @ManyToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.user)
  chatRoom: ChatRoomEntity[];

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
