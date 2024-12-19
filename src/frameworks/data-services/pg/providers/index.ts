import InjectableString from 'src/common/injectable.string';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../entities';
import { ChatRoomEntity } from '../entities/chat-room.entity';
import { FileEntity } from '../entities/file.entity';
import { MessageEntity } from '../entities/message.entity';
import { UsersEntity } from '../entities/users.entity';
import { appDataSourceProviders } from './appDatabase.provider';
import { PermissionEntity } from '../entities/permission.entity';
import { AppointmentEntity } from '../entities/appointment.entity';
import { RecordEntity } from '../entities/record.entity';

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
    provide: ChatRoomEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(ChatRoomEntity);
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
