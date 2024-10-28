import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';

@Injectable()
export class ClsStoreService implements IClsStore<AppClsStore> {
  constructor(private readonly cls: ClsService<AppClsStore>) {}

  get<T>(key: keyof AppClsStore): T | undefined {
    return this.cls.get(key);
  }
  set<T>(key: keyof AppClsStore, value: T): void {
    this.cls.set(key, value as T);
  }
}
