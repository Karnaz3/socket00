import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { MedicationFactoryService } from './medication-factory.usecase.service';
import { MedicationUsecaseService } from './medication.usecase.service';

@Module({
  imports: [DataServicesModule],
  providers: [MedicationFactoryService, MedicationUsecaseService],
  exports: [MedicationFactoryService, MedicationUsecaseService],
})
export class MedicationServiceModule {}
