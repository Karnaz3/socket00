import { plainToInstance } from 'class-transformer';

export function transformObjectToClass<T>(sourceObject: object, targetClass: new () => T): T {
  return plainToInstance(targetClass, sourceObject, {
    enableImplicitConversion: false,
    excludeExtraneousValues: true,
  });
}
