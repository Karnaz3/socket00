import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChatRoomEntity } from './chat-room.entity';
import { UsersEntity } from './users.entity';

@Entity('message')
export class MessageEntity extends BaseEntity {
  @Column({
    name: 'content',
  })
  content: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'sender_id',
  })
  sender: UsersEntity;

  @ManyToOne(() => ChatRoomEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_chat_room_id', // Assuming the foreign key in the database is user_chat_room_id
  })
  chatRoom: ChatRoomEntity;
}
