import { Module } from '@nestjs/common';
import { redisProvider } from './redis.providers';
import { RedisService } from './redis.service';
import { EnvironmentConfigModule } from '../config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [redisProvider, RedisService], // Use the single provider
  exports: [RedisService], // Export only the RedisService
})
export class RedisModule {}
