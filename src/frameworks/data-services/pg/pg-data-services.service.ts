import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import InjectableString from 'src/common/injectable.string';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IAdminRepository } from 'src/core/abstracts/repositories/admin.abstract';
import { IUserRepository } from 'src/core/abstracts/repositories/user.abstract';
import { AdminModel } from 'src/core/models';
import { FileModel } from 'src/core/models/file.model';
import { UserModel } from 'src/core/models/user.model';
import { DataSource, Repository } from 'typeorm';
import { AdminEntity } from './entities';
import { FileEntity } from './entities/file.entity';
import { UsersEntity } from './entities/users.entity';
import { PgGenericRepository } from './pg-generic-repository';
import { PgAdminRepository } from './repositories/admin.repository';
import { PgIUserRepository } from './repositories/user.repository';

@Injectable()
export class PgDataServices implements IDataServices, OnApplicationBootstrap {
  admin: IAdminRepository<AdminModel>;
  user: IUserRepository<UserModel>;
  file: PgGenericRepository<FileModel>;

  constructor(
    @Inject(AdminEntity.REPOSITORY)
    private adminRepository: Repository<AdminEntity>,

    @Inject(UsersEntity.REPOSITORY)
    private userRepository: Repository<UsersEntity>,

    @Inject(FileEntity.REPOSITORY)
    private fileRepository: Repository<FileEntity>,

    private readonly cls: IClsStore<AppClsStore>,

    @Inject(InjectableString.APP_DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  onApplicationBootstrap() {
    // admin
    this.admin = new PgAdminRepository(this.cls, this.adminRepository);
    // user
    this.user = new PgIUserRepository(this.cls, this.userRepository);
    // file
    this.file = new PgGenericRepository(this.cls, this.fileRepository);
  }
}
