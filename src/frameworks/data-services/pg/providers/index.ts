import InjectableString from 'src/common/injectable.string';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../entities';
import { ChatRoomEntity } from '../entities/chat-room.entity';
import { FileEntity } from '../entities/file.entity';
import { MessageEntity } from '../entities/message.entity';
// import { ParticipantsEntity } from '../entities/participants.entity';
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
  // {
  //   provide: ParticipantsEntity.REPOSITORY,
  //   useFactory: (dataSource: DataSource) => {
  //     return dataSource.getRepository(ParticipantsEntity);
  //   },
  //   inject: [InjectableString.APP_DATA_SOURCE],
  // },
];

export default providers;
