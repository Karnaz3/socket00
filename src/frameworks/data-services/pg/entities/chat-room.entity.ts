import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';
import { UsersEntity } from './users.entity';

@Entity('chat_room')
export class ChatRoomEntity extends BaseEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'is_private',
    default: false,
  })
  isPrivate: boolean;

  @ManyToMany(() => UsersEntity, (user) => user.chatRoom, { eager: true })
  @JoinTable({
    name: 'participants',
    joinColumn: {
      name: 'chat_room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  user: UsersEntity[];

  @OneToMany(() => MessageEntity, (message) => message.chatRoom, { eager: true })
  message: MessageEntity[];
}
