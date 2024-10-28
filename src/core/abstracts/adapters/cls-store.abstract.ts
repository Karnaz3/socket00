export abstract class IClsStore<StoreType> {
  abstract get<T>(key: keyof StoreType): T;
  abstract set<T>(key: keyof StoreType, value: T): void;
}
