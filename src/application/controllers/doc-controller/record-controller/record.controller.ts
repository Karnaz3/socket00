import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateRecordtDto } from 'src/core/dtos/records-request/record.dto';
import { AdminRecordUseCaseService } from 'src/use-cases/record-use-cases/doc-record-use-case/record-use-case.service';

@Controller('report-controller')
export class DocRecordController {
  constructor(private readonly useCaseService: AdminRecordUseCaseService) {}

  @Post('record')
  async createApplication(@Body() dto: CreateRecordtDto) {
    return CoreApiResponse.success(await this.useCaseService.createRecord(dto));
  }

  @Get('records')
  async getApplications(@Query('status') status: ReportStatusEnum) {
    const data = await this.useCaseService.getRecords({ status });
    return CoreApiResponse.success(data);
  }

  @Patch('update-record')
  async updateAppplication(@Body() dto: CreateRecordtDto) {
    return CoreApiResponse.success(await this.useCaseService.updateRecord(dto));
  }

  @Delete('record/:id')
  async deleteApplication(@Param('id') id: number) {
    return CoreApiResponse.success(await this.useCaseService.removeRecord(id));
  }
}
