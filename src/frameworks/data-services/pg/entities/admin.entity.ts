import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { BeforeInsert, Column, Entity } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column({
    name: 'full_name',
  })
  name: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    default: AdminRoleEnum.ADMIN,
    name: 'role',
  })
  role: AdminRoleEnum;

  @Column({
    nullable: true,
    name: 'avatar',
  })
  avatar: string;

  @Column({
    name: 'company_name',
    nullable: true,
  })
  companyName: string;

  @Column({
    name: 'company_logo',
    nullable: true,
  })
  companyLogo: string;
  // comparePassword

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // hashPassword
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    console.log('base entity');
    this.password = await this.hashPassword(this.password);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
