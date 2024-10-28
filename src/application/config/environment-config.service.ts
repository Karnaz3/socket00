import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/core/config/database.interface';
import { JWTConfig } from 'src/core/config/jwt.interface';
import { DefaultSuperAdminConfig } from 'src/core/config/superadmin.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, DefaultSuperAdminConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseCa(): string {
    return this.configService.get<string>('DATABASE_CA');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getDefaultAdminName(): string {
    return this.configService.get<string>('ADMIN_NAME');
  }

  getDefaultAdminLastName(): string {
    return this.configService.get<string>('ADMIN_LAST_NAME');
  }

  getDefaultAdminEmail(): string {
    return this.configService.get<string>('ADMIN_EMAIL');
  }

  getDefaultAdminPassword(): string {
    return this.configService.get<string>('ADMIN_PASSWORD');
  }

  getDefaultAdminAvatar(): string {
    return this.configService.get<string>('ADMIN_AVATAR');
  }
}
