import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import rescue from 'src/common/helpers/rescue.helper';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';
import { IPaginationData } from 'src/common/interface/response/interface/response-data.interface';
import { IGenericRepository, OtherMethodOptions } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { Repository } from 'typeorm';

export class PgGenericRepository<T> implements IGenericRepository<T> {
  protected _repository: Repository<T>;
  protected cls: IClsStore<AppClsStore>;

  constructor(cls: IClsStore<AppClsStore>, repository: Repository<T>) {
    this.cls = cls;
    this._repository = repository;
  }

  async getAll(
    condition: NonNullable<unknown> | any[],
    relations: NonNullable<unknown>,
    order: NonNullable<unknown>,
    select: NonNullable<unknown>,
  ): Promise<IPaginationData> {
    return rescue<IPaginationData>(async (): Promise<IPaginationData> => {
      let { page, limit } = this.cls.get<IPaginationQuery>('paginationQuery');
      if (!page) page = 1;
      if (!limit) limit = 10;

      const [data, total] = await this._repository.findAndCount({
        where: Array.isArray(condition) ? [...condition] : condition,
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
        relations: { ...relations },
        order: order ? { ...order } : ({ id: 'DESC' } as any),
        select: select,
      });
      return {
        data: data as [],
        total,
        limit: limit || 10,
        page: page || 1,
        previous: page > 1 ? `${Number(page) - 1}` : null,
        next: page * limit < total ? `${Number(page) + 1}` : null,
      };
    });
  }

  async getAllWithoutPagination(
    condition: NonNullable<unknown> | any[],
    relations: NonNullable<unknown>,
  ): Promise<T[]> {
    return rescue<T[]>(async (): Promise<T[]> => {
      return this._repository.find({
        where: condition,
        relations: { ...relations },
      });
    });
  }

  async getOne(condition: any, relations?: NonNullable<unknown> | undefined): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const item: T = await this._repository.findOne({
        where: condition,
        relations: { ...relations },
      });
      if (item) {
        return item;
      } else {
        throw new AppNotFoundException(this._repository.metadata.targetName.replace('Entity', '') + ' not found', 404);
      }
    });
  }
  async getOneOrNull(
    condition: any,
    relations?: NonNullable<unknown> | undefined,
    options?: OtherMethodOptions,
  ): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const item: T = await this._repository.findOne({
        where: condition,
        relations: { ...relations },
        ...options,
      });
      if (item) {
        return item;
      }
      return null;
    });
  }

  async create(item: T): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      return this._repository.save(item);
    });
  }

  async createBulk(item: T[]): Promise<T[]> {
    return rescue<T[]>(async (): Promise<T[]> => {
      return this._repository.save(item);
    });
  }

  async update(condition: NonNullable<unknown>, item: any) {
    return rescue<T>(async (): Promise<T> => {
      const oldItem: T = await this.getOne(condition);
      if (!oldItem) {
        throw new AppNotFoundException(this._repository.metadata.targetName.replace('Entity', '') + ' not found', 404);
      }
      await this._repository.update(condition, item);
      return this._repository.findOneBy(condition);
    });
  }
  async updateMany(condition: NonNullable<unknown>, item: any) {
    return rescue<T>(async (): Promise<any> => {
      const updateResult = await this._repository.update(condition, item);
      return updateResult;
    });
  }

  async findOrCreate(condition: NonNullable<unknown>, item: T, relations?: NonNullable<unknown>): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const oldItem: T = await this._repository.findOne({
        where: condition,
        relations: { ...relations },
      });
      if (!oldItem) {
        return this._repository.save(item);
      }
      return oldItem;
    });
  }

  async createOrUpdate(condition: NonNullable<unknown>, item: any, relations?: NonNullable<unknown>): Promise<T> {
    const oldItem: T = await this._repository.findOne({
      where: condition,
      relations: { ...relations },
    });

    if (!oldItem) {
      return this._repository.save(item);
    }

    const updatedItem = this._repository.merge(oldItem, item);
    return await this._repository.save(updatedItem);
  }

  async remove(condition: NonNullable<unknown>, relations?: NonNullable<unknown>): Promise<any> {
    return rescue<any>(async (): Promise<any> => {
      const event = await this.getAllWithoutPagination(condition, relations);
      return this._repository.softRemove(event);
    });
  }
}
