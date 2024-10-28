import InjectableString from 'src/common/injectable.string';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../entities';
import { FileEntity } from '../entities/file.entity';
import { UsersEntity } from '../entities/users.entity';
import { appDataSourceProviders } from './appDatabase.provider';

const providers = [
  ...appDataSourceProviders,
  {
    provide: AdminEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(AdminEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: UsersEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(UsersEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },

  {
    provide: FileEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(FileEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
];

export default providers;
