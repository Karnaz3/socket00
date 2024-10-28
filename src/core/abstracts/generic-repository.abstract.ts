import { IPaginationData } from 'src/common/interface/response/interface/response-data.interface';
import { RelationType } from 'src/common/type/relation';

export type keyValueObj = {
  [key: string]: any;
};
export type OtherMethodOptions = {
  withDeleted?: boolean;
};
export abstract class IGenericRepository<T> {
  abstract getAll(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
    select?: keyValueObj,
  ): Promise<IPaginationData>;

  abstract getAllWithoutPagination(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
  ): Promise<T[]>;

  abstract getOne(condition: keyValueObj, relations?: RelationType): Promise<T>;

  abstract getOneOrNull(
    condition: keyValueObj | any[],
    relations?: RelationType,
    methodOptions?: OtherMethodOptions,
  ): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(condition: keyValueObj, item: T): Promise<T>;

  abstract findOrCreate(condition: keyValueObj, item: T, relations?: RelationType): Promise<T>;

  abstract createOrUpdate(condition: keyValueObj, item: T, relations?: RelationType): Promise<T>;

  abstract createBulk(items: T[]): Promise<T[]>;

  abstract updateMany(condition: keyValueObj, item: keyValueObj): Promise<any>;

  abstract remove(condition: keyValueObj, relations?: RelationType): Promise<any>;
}
