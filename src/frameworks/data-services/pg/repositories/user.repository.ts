import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IUserRepository } from 'src/core/abstracts/repositories/user.abstract';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { PgGenericRepository } from '../pg-generic-repository';

export class PgIUserRepository extends PgGenericRepository<UsersEntity> implements IUserRepository<UsersEntity> {
  protected _repository: Repository<UsersEntity>;
  protected cls: IClsStore<AppClsStore>;
  constructor(cls: IClsStore<AppClsStore>, repository: Repository<UsersEntity>) {
    super(cls, repository);
  }
}
