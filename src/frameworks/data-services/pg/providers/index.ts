import InjectableString from 'src/common/injectable.string';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../entities';
import { AppointmentEntity } from '../entities/appointment.entity';
import { FileEntity } from '../entities/file.entity';
import { MessageEntity } from '../entities/message.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { RecordEntity } from '../entities/record.entity';
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

  {
    provide: MessageEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(MessageEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: PermissionEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(PermissionEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: AppointmentEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(AppointmentEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: RecordEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(RecordEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
];

export default providers;
