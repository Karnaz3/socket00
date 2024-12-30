import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { UserRecordUseCaseService } from 'src/use-cases/record-use-cases/user-record-use-case/record-use-case.service';

@Controller('user-records')
export class UserRecordsController {
  constructor(private readonly useCaseService: UserRecordUseCaseService) {}

  @Get('records')
  async getAllRecords(@Query('status') status: ReportStatusEnum) {
    const data = await this.useCaseService.getAllRecords({ status });
    return CoreApiResponse.success(data);
  }

  @Get('record/:id')
  async getRecordById(@Param('id') id: number) {
    const data = await this.useCaseService.getRecordById(id);
    return CoreApiResponse.success(data);
  }
}
