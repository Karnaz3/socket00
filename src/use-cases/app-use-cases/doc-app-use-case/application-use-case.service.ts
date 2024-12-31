import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { AppClsStore, IDocClsData } from 'src/common/interface/app-cls-store.interface';
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
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  //if no id for doc is provided then it is asigned to the creator of the application in case of docs
  async createApplication(dto: CreateApplicationDto) {
    const doc = this.cls.get<IDocClsData>('doc');
    if (!dto.docId) dto.docId = doc.id;
    const oldRecords = await this.dataServices.record.getAllWithoutPagination({
      user: { id: dto.userId },
    });
    const application = this.factoryService.createApplication(dto, oldRecords);
    return await this.dataServices.appointment.create(application);
  }

  async getAllAssignedApplications() {
    return await this.dataServices.appointment.getAllWithoutPagination({
      requestByDoc: true,
    });
  }

  async getIndividualAssignedApplication() {
    const doc = this.cls.get<IDocClsData>('doc');
    return await this.dataServices.appointment.getOne({
      doc: { id: doc.id },
      requestByDoc: true,
    });
  }

  async getApplications(query: { status: ReportStatusEnum }) {
    interface Condition {
      requestByDoc: boolean;
      status?: ReportStatusEnum;
    }
    let condition: Condition = {
      requestByDoc: false,
    };
    if (query.status) {
      condition = {
        ...condition,
        status: query.status,
      };
    }
    return await this.dataServices.appointment.getAllWithoutPagination(condition);
  }

  async updateApplication(dto: UpdateApplicationDto) {
    const updatedApplication = this.factoryService.updateApplication(dto);
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
        problem: application.note ? application.note : 'to be filled by admin',
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
