import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateUserApplicationDto, UpdateApplicationUserDto } from 'src/core/dtos/application-request/application.dto';
import { UserApplicationUseCaseService } from 'src/use-cases/app-use-cases/user-app-use-case/application-use-case.service';

@Controller('user-application')
export class UserApplicationController {
  constructor(private readonly useCaseService: UserApplicationUseCaseService) {}

  @Post('application')
  async createApplication(@Body() dto: CreateUserApplicationDto) {
    return CoreApiResponse.success(await this.useCaseService.createApplication(dto));
  }

  @Get('applications')
  async getApplications(@Query('status') status: ReportStatusEnum) {
    const data = await this.useCaseService.getApplications({ status });
    return CoreApiResponse.success(data);
  }

  @Patch('update/application')
  async updateApplication(@Body() dto: UpdateApplicationUserDto) {
    const data = await this.useCaseService.updateApplication(dto);
    return CoreApiResponse.success(data);
  }
}
