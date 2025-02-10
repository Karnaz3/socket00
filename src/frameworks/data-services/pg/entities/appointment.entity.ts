import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RecordEntity } from './record.entity';
import { UsersEntity } from './users.entity';

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
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

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', nullable: true, eager: true })
  @JoinColumn({
    name: 'doc_id',
  })
  doc: UsersEntity;

  @OneToMany(() => RecordEntity, (record) => record.appointment, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  records: RecordEntity[];

  @Column({
    name: 'status',
    type: 'enum',
    enum: ReportStatusEnum,
  })
  status: ReportStatusEnum;

  @Column({
    name: 'note',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'visit_date',
    nullable: true,
  })
  visitDate: Date;

  @Column({
    name: 'request_by_doc',
    type: 'boolean',
    default: false,
  })
  requestByDoc: boolean;
}
