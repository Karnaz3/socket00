import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { AppClsStore, IUserClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { CreateUserApplicationDto, UpdateApplicationUserDto } from 'src/core/dtos/application-request/application.dto';
import { UserApplicationFactoryUseCaseService } from './application-factory-use-case.service';
import { AppointmentModel } from 'src/core/models/appointment.model';

@Injectable()
export class UserApplicationUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly factoryService: UserApplicationFactoryUseCaseService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createApplication(dto: CreateUserApplicationDto) {
    const userDetails = this.cls.get<IUserClsData>('user');
    const user = await this.dataServices.user.getOne({ id: userDetails.id });
    const application = this.factoryService.createApplication(dto, user);
    return await this.dataServices.appointment.create(application);
  }

  async getApplications(query: { status: ReportStatusEnum }) {
    const user = this.cls.get<IUserClsData>('user');

    interface Condition {
      user: { id: number };
      status?: ReportStatusEnum;
    }

    let condition: Condition = {
      user: { id: user.id },
    };

    if (query.status) {
      condition = {
        ...condition,
        status: query.status,
      };
    }

    return await this.dataServices.appointment.getAllWithoutPagination(condition);
  }

  async updateApplication(dto: UpdateApplicationUserDto) {
    const application = await this.dataServices.appointment.getOne({
      id: dto.id,
    });
    const updatedApplication = this.factoryService.updateApplication(application, dto);
    return await this.dataServices.appointment.update({ id: dto.id }, updatedApplication);
  }

  async cancelApplication(id: number) {
    const application = await this.dataServices.appointment.getOne({ id });
    return await this.dataServices.appointment.update(application, {
      status: ReportStatusEnum.CANCELLED,
    } as AppointmentModel);
  }

  async getCancelledApplications() {
    const user = this.cls.get<IUserClsData>('user');
    return await this.dataServices.appointment.getAllWithoutPagination({
      user: { id: user.id },
      status: ReportStatusEnum.CANCELLED,
    });
  }

  //let user not remove the application
  //async removeApplication(id: number) {
  //  const application = await this.dataServices.appointment.getOne({ id });
  //  return await this.dataServices.appointment.remove({ id: application.id });
  //}
}
