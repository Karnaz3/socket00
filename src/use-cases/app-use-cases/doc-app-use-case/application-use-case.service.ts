import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { AdminApplicationFactoryUseCaseService } from './application-factory-use-case.service';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/core/dtos/application-request/application.dto';

@Injectable()
export class AdminApplicationUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly factoryService: AdminApplicationFactoryUseCaseService,
  ) {}

  async createApplication(dto: CreateApplicationDto) {
    const application = this.factoryService.createApplication(dto);
    return await this.dataServices.appointment.create(application);
  }

  async getApplications(query: { status: ReportStatusEnum }) {
    let condition = {};
    if (query.status) {
      condition = {
        status: query.status,
      };
    }
    return await this.dataServices.appointment.getAllWithoutPagination(condition);
  }

  async updateApplication(dto: UpdateApplicationDto) {
    const application = await this.dataServices.appointment.getOne({
      id: dto.id,
    });
    const updatedApplication = this.factoryService.updateApplication(application, dto);
    return await this.dataServices.appointment.update({ id: dto.id }, updatedApplication);
  }

  async removeApplication(id: number) {
    const application = await this.dataServices.appointment.getOne({ id });
    return await this.dataServices.appointment.remove({ id: application.id });
  }
}
