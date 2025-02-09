import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationServiceModule } from 'src/use-cases/medication-usecase/medication.module';

@Module({
  imports: [MedicationServiceModule],
  controllers: [MedicationController],
})
export class MedicationControllerModule {}
