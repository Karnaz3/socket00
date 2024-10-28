import { Module } from '@nestjs/common';
import { PgDataServicesModule } from 'src/frameworks/data-services/pg/pg-data-services.module';

@Module({
  imports: [PgDataServicesModule],
  exports: [PgDataServicesModule],
})
export class DataServicesModule {}
