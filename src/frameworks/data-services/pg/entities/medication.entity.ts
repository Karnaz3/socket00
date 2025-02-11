import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';
import { RecordEntity } from './record.entity';

@Entity('medication')
export class MedicationEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'dosage',
    nullable: false,
  })
  dosage: string;

  @Column({
    name: 'frequency',
    nullable: false,
  })
  frequency: string;

  @Column({
    name: 'expiration_date',
    nullable: false,
  })
  expirationDate: Date;

  @Column({
    name: 'duration',
    nullable: false,
  })
  duration: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @Column({
    name: 'doc_id',
    nullable: false,
  })
  docId: number;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'doc_id',
  })
  doc: UsersEntity;

  @Column({
    name: 'record_id',
    nullable: false,
  })
  recordId: number;

  @ManyToOne(() => RecordEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'record_id',
  })
  record: RecordEntity;
}
