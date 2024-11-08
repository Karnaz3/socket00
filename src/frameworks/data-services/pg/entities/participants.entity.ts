// import { Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { BaseEntity } from './base.entity';
// import { UsersEntity } from './users.entity';
// import { ChatRoomEntity } from './chat-room.entity';

// @Entity('participants')
// export class ParticipantsEntity extends BaseEntity {
//   @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.participant)
//   @JoinColumn({
//     name: 'chat_room_id',
//   })
//   chatRoom: ChatRoomEntity;

//   @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
//   @JoinColumn({
//     name: 'user_id',
//   })
//   user: UsersEntity;
// }
