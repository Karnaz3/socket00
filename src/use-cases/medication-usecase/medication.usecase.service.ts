import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { MedicationFactoryService } from './medication-factory.usecase.service';
import { ClsService } from 'nestjs-cls';
import { AppClsStore, IDocClsData } from 'src/common/interface/app-cls-store.interface';
import { CreateMedicationDto, UpdateMedicationDto } from 'src/core/dtos/medication.dto';

@Injectable()
export class MedicationUsecaseService {
  constructor(
    private readonly dataService: IDataServices,
    private readonly factoyService: MedicationFactoryService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createMedication(dto: CreateMedicationDto) {
    const medication = this.factoyService.createMedication(dto);
    return await this.dataService.medication.create(medication);
  }

  async updateMedication(dto: UpdateMedicationDto) {
    const updatedMedication = this.factoyService.updateMedication(dto);
    return await this.dataService.medication.update(
      {
        id: dto.medicationId,
      },
      updatedMedication,
    );
  }

  async getAllMedication() {
    return await this.dataService.medication.getAll();
  }

  async getAllMedicationByDoc() {
    const doc = this.cls.get<IDocClsData>('doc');
    return await this.dataService.medication.getAllWithoutPagination({
      docId: doc.id,
    });
  }

  async getMedicationByUser(userId: number) {
    return await this.dataService.medication.getAllWithoutPagination({
      userId: userId,
    });
  }

  async removeMedication(id: number) {
    await this.dataService.medication.getOne({
      id: id,
    });
    return await this.dataService.medication.remove({
      id: id,
    });
  }
}
