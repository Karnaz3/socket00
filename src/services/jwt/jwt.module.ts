import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { EnvironmentConfigModule } from 'src/application/config/environment-config.module';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      global: true,
      useFactory: (configService: EnvironmentConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpirationTime(),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtTokenService,
    },
  ],
  exports: [IJwtService],
})
export class JwtServiceModule {}
