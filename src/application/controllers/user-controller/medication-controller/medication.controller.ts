import { Controller, Get, Param } from '@nestjs/common';
import { MedicationUsecaseService } from 'src/use-cases/medication-usecase/medication.usecase.service';

@Controller('medication')
export class MedicationController {
  constructor(private readonly dataService: MedicationUsecaseService) {}

  @Get('get-self-medication/:userId')
  async getSelfMedication(@Param('userId') userId: number) {
    return await this.dataService.getMedicationByUser(userId);
  }
}
