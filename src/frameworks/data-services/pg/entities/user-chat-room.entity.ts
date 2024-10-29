import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChatRoomEntity } from './chat-room.entity';
import { UsersEntity } from './users.entity';
import { MessageEntity } from './message.entity';

@Entity('user_chat_room')
export class UserChatRoom extends BaseEntity {
  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @ManyToOne(() => ChatRoomEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'chat_room_id',
  })
  chatRoom: ChatRoomEntity;

  @JoinColumn({
    name: 'last_read_message_id',
  })
  lastReadMessageId: MessageEntity;
}
