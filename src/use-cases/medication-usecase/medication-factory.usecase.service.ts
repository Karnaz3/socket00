import { Injectable } from '@nestjs/common';
import { CreateMedicationDto, UpdateMedicationDto } from 'src/core/dtos/medication.dto';
import { MedicationModel } from 'src/core/models/medication.model';

@Injectable()
export class MedicationFactoryService {
  createMedication(dto: CreateMedicationDto) {
    const medication = new MedicationModel();
    medication.name = dto.name;
    if (dto.description) medication.description = dto.description;
    medication.dosage = dto.dosage;
    medication.frequency = dto.frequency;
    medication.expirationDate = dto.expirationDate;
    medication.duration = dto.duration;
    medication.docId = dto.docId;
    medication.userId = dto.userId;
    return medication;
  }

  updateMedication(dto: UpdateMedicationDto) {
    const medicaiton = new MedicationModel();
    if (dto.name) medicaiton.name = dto.name;
    if (dto.description) medicaiton.description = dto.description;
    if (dto.dosage) medicaiton.dosage = dto.dosage;
    if (dto.frequency) medicaiton.frequency = dto.frequency;
    if (dto.expirationDate) medicaiton.expirationDate = dto.expirationDate;
    if (dto.duration) medicaiton.duration = dto.duration;
    if (dto.docId) medicaiton.docId = dto.docId;
    if (dto.userId) medicaiton.userId = dto.userId;
    return medicaiton;
  }
}
