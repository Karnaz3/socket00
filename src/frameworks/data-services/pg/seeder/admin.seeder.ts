// import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { Injectable, Logger } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';

@Injectable()
export class AdminSeeder {
  private configService: EnvironmentConfigService;
  constructor(configService: EnvironmentConfigService) {
    this.configService = configService;
  }

  async seed(repository: Repository<AdminEntity>) {
    const adminUser = await repository.findOne({
      where: { email: this.configService.getDefaultAdminEmail() },
    });

    if (!adminUser) {
      const adminUser: AdminEntity = repository.create({
        email: this.configService.getDefaultAdminEmail(),
        password: this.configService.getDefaultAdminPassword(),
        name: this.configService.getDefaultAdminName(),
        role: AdminRoleEnum.SUPER_ADMIN,
        avatar: this.configService.getDefaultAdminAvatar(),
      });
      await repository.insert(adminUser);
    } else {
      Logger.log('Admin user already exists', AdminSeeder.name);
    }
  }
}
