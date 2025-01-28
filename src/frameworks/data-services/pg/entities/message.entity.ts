import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { BaseEntity } from './base.entity';
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

  @ManyToOne(() => AppointmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'appointment_id', // Assuming the foreign key in the database is user_chat_room_id
  })
  appointment: AppointmentEntity;
}
