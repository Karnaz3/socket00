import { HttpException, Logger } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import InjectableString from 'src/common/injectable.string';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AdminEntity } from '../entities';
import { AdminSeeder } from '../seeder/admin.seeder';

export const appDataSourceProviders = [
  {
    provide: InjectableString.APP_DATA_SOURCE,
    useFactory: async (adminSeeder: AdminSeeder, config: EnvironmentConfigService) => {
      try {
        const dataSourceOptions: object = {
          type: 'postgres',
          host: config.getDatabaseHost(),
          port: config.getDatabasePort(),
          username: config.getDatabaseUser(),
          password: config.getDatabasePassword(),
          database: config.getDatabaseName(),
          entities: ['dist/frameworks/data-services/pg/entities/**/*.entity{.ts,.js}'],
          synchronize: true,
        };

        if (config.getDatabaseCa()) {
          dataSourceOptions['ssl'] = {
            rejectUnauthorized: false,
            ca: config.getDatabaseCa(),
          };
        }
        // ssl: {
        //   rejectUnauthorized: false,
        //   ca: config.getDatabaseCa()
        // }

        const appDataSource = new DataSource(dataSourceOptions as DataSourceOptions);
        await appDataSource.initialize();
        adminSeeder.seed(appDataSource.getRepository(AdminEntity));
        return appDataSource;
      } catch (error) {
        Logger.log(error, 'appDataSourceProviders');
        throw new HttpException(error.message, error.status);
      }
    },
    inject: [AdminSeeder, EnvironmentConfigService],
  },
];
