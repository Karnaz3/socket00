import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { MedicationUsecaseService } from 'src/use-cases/medication-usecase/medication.usecase.service';

@Controller('medicaiton')
export class MedicationController {
  constructor(private readonly medicationUsecase: MedicationUsecaseService) {}

  @Post()
  async createMedication(dto) {
    return CoreApiResponse.success(await this.medicationUsecase.createMedication(dto));
  }

  @Patch()
  async updateMedication(dto) {
    return CoreApiResponse.success(await this.medicationUsecase.updateMedication(dto));
  }

  @Get('get-doc-medication')
  async getDocMedication() {
    return CoreApiResponse.success(await this.medicationUsecase.getAllMedicationByDoc());
  }

  @Get('get-all-medication')
  async getAllMedication() {
    return CoreApiResponse.success(await this.medicationUsecase.getAllMedication());
  }

  @Get('get-user-medication/:userId')
  async getUserMdeication(@Param('userId') userId: number) {
    return CoreApiResponse.success(await this.medicationUsecase.getMedicationByUser(userId));
  }
}
