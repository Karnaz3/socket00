import rescue from 'src/common/helpers/rescue.helper';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IAdminRepository } from 'src/core/abstracts/repositories/admin.abstract';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities';
import { PgGenericRepository } from '../pg-generic-repository';

export class PgAdminRepository extends PgGenericRepository<AdminEntity> implements IAdminRepository<AdminEntity> {
  protected _repository: Repository<AdminEntity>;
  protected cls: IClsStore<AppClsStore>;
  constructor(cls: IClsStore<AppClsStore>, repository: Repository<AdminEntity>) {
    super(cls, repository);
  }

  async deleteById(id: string): Promise<void> {
    return rescue<void>(async (): Promise<void> => {
      await this._repository.delete(id);
    });
  }
}
