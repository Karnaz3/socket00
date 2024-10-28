import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
@Module({
  imports: [DataServicesModule],
  providers: [],
  exports: [],
})
export class PublicUseCasesModule {}
