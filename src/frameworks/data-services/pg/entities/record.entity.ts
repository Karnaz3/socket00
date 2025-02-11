import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { AppointmentEntity } from './appointment.entity';
import { MedicationEntity } from './medication.entity';

@Entity('record')
export class RecordEntity extends BaseEntity {
  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', eager: true })
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
    nullable: true,
  })
  solution: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ReportStatusEnum,
  })
  status: ReportStatusEnum;

  @ManyToOne(() => AppointmentEntity, (appoint) => appoint.records, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: AppointmentEntity;

  @Column({
    name: 'medication_id',
    nullable: true,
  })
  medicationId: number;

  @OneToMany(() => MedicationEntity, (medication) => medication.record)
  @JoinColumn({
    name: 'medication_id',
  })
  medication: MedicationEntity;
}
