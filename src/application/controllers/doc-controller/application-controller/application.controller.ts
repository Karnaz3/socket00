import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/core/dtos/application-request/application.dto';
import { AdminApplicationUseCaseService } from 'src/use-cases/app-use-cases/doc-app-use-case/application-use-case.service';

@Controller('application-controller')
export class DocApplicationController {
  constructor(private readonly useCaseService: AdminApplicationUseCaseService) {}

  //when doc creates a application it is for shiftdoc for old in person care
  @Post('application')
  async createApplication(@Body() dto: CreateApplicationDto) {
    return CoreApiResponse.success(await this.useCaseService.createApplication(dto));
  }

  @Post('finish-appoinement/:appointmentId')
  async finishAppointment(@Param('appointmentId') appointmentId: number) {
    return CoreApiResponse.success(await this.useCaseService.finishApplication(appointmentId));
  }

  // applications by users
  @Get('own-approved')
  async getOwnApprovedApplications() {
    return CoreApiResponse.success(await this.useCaseService.getApprovedApplications());
  }
  @Get('applications')
  async getApplications(@Query('status') status: ReportStatusEnum) {
    const data = await this.useCaseService.getApplications({ status });
    return CoreApiResponse.success(data);
  }

  @Get('applications/doc')
  async getAssignedApplications() {
    return CoreApiResponse.success(await this.useCaseService.getAllAssignedApplications());
  }

  @Get('applications/message/:appointmentId')
  async getApplicationMessages(@Param('appointmentId') appointmentId: number) {
    return CoreApiResponse.success(await this.useCaseService.getApplicationMessage(appointmentId));
  }

  @Patch('update/application')
  async updateAppplication(@Body() dto: UpdateApplicationDto) {
    return CoreApiResponse.success(await this.useCaseService.updateApplication(dto));
  }

  @Delete('application/:id')
  async deleteApplication(@Param('id') id: number) {
    return CoreApiResponse.success(await this.useCaseService.removeApplication(id));
  }
}
