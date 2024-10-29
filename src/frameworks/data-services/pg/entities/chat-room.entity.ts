import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
