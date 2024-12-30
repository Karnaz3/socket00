import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { IDataServices } from 'src/core/abstracts';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/core/dtos/application-request/application.dto';
import { CreateRecordtDto } from 'src/core/dtos/records-request/record.dto';
import { AppointmentModel } from 'src/core/models/appointment.model';
import { AdminRecordFactoryUseCaseService } from 'src/use-cases/record-use-cases/doc-record-use-case/record-factory-use-case.service';
import { AdminApplicationFactoryUseCaseService } from './application-factory-use-case.service';

@Injectable()
export class AdminApplicationUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly factoryService: AdminApplicationFactoryUseCaseService,
    private readonly recordFactoryService: AdminRecordFactoryUseCaseService,
  ) {}

  async createApplication(dto: CreateApplicationDto) {
    const oldRecords = await this.dataServices.record.getAllWithoutPagination({
      user: { id: dto.userId },
    });
    const application = this.factoryService.createApplication(dto, oldRecords);
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

  //finishing application refers to closing of the application and creating a report only status changed
  async finishApplication(id: number) {
    const application = await this.dataServices.appointment.getOne({
      id: id,
    });
    await this.dataServices.appointment.update(application, { status: ReportStatusEnum.RESOLVED } as AppointmentModel);
    const record = this.recordFactoryService.createReport(
      {
        userId: application.user.id,
        docId: application.doc.id,
        problem: application.note || 'to be filled by admin',
        solution: 'to be filled by admin',
        status: ReportStatusEnum.IN_PROGRESS,
      } as CreateRecordtDto,
      application,
    );
    return await this.dataServices.record.create(record);
  }

  async removeApplication(id: number) {
    const application = await this.dataServices.appointment.getOne({ id });
    return await this.dataServices.appointment.remove({ id: application.id });
  }
}
