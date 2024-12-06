import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { EnvironmentConfigService } from '../config/environment-config.service';

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (config: EnvironmentConfigService): RedisClient => {
    return new Redis({
      host: config.getRedisHost(),
      port: config.getRedisPort(),
      username: config.getRedisUsername(),
      password: config.getRedisPassword(),
    });
  },
  provide: 'REDIS_CLIENT', // Single Redis client for both subscribing and publishing
  inject: [EnvironmentConfigService],
};
