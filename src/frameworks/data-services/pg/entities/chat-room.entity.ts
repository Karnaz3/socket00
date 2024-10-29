import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';
import { ParticipantsEntity } from './participants.entity';

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

  @ManyToOne(() => MessageEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'last_message_id',
  })
  lastMessage: MessageEntity;

  @OneToMany(() => ParticipantsEntity, (participants) => participants.chatRoom)
  @JoinColumn({
    name: 'participant_id',
  })
  participants: ParticipantsEntity;
}
