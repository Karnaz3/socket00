import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { CreateMedicationDto, UpdateMedicationDto } from 'src/core/dtos/medication.dto';
import { MedicationUsecaseService } from 'src/use-cases/medication-usecase/medication.usecase.service';

@Controller('medicaiton')
export class MedicationController {
  constructor(private readonly medicationUsecase: MedicationUsecaseService) {}

  @Post()
  async createMedication(@Body() dto: CreateMedicationDto) {
    return CoreApiResponse.success(await this.medicationUsecase.createMedication(dto));
  }

  @Patch()
  async updateMedication(@Body() dto: UpdateMedicationDto) {
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
