import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { AppointmentEntity } from './appointment.entity';

@Entity('record')
export class RecordEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'doc_id',
  })
  doc: UsersEntity;

  @Column({
    name: 'problem',
  })
  problem: string;

  @Column({
    name: 'solution',
  })
  solution: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ReportStatusEnum,
  })
  status: ReportStatusEnum;

  @ManyToOne(() => AppointmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: AppointmentEntity;
}
