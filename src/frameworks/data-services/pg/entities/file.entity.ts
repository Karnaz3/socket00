import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('pre_ipo_file')
export class FileEntity extends BaseEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'path',
  })
  path: string;

  @Column({
    name: 'file_type',
  })
  fileType: string;
}
