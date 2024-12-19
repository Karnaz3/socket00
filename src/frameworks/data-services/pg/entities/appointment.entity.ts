import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RecordEntity } from './record.entity';
import { UsersEntity } from './users.entity';

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
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

  @OneToMany(() => RecordEntity, (record) => record.appointment)
  records: RecordEntity[];

  @Column({
    name: 'status',
    type: 'enum',
    enum: ReportStatusEnum,
  })
  status: ReportStatusEnum;
}
