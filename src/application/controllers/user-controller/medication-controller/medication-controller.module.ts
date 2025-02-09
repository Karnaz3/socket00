import { Module } from '@nestjs/common';
import { MedicationServiceModule } from 'src/use-cases/medication-usecase/medication.module';
import { MedicationController } from './medication.controller';

@Module({
  imports: [MedicationServiceModule],
  controllers: [MedicationController],
})
export class MedicationControllerModuleUser {}
