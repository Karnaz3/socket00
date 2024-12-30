import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { AppClsStore, IUserClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';

@Injectable()
export class UserRecordUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async getAllRecords(query: { status: ReportStatusEnum }) {
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
    const data = await this.dataServices.record.getAllWithoutPagination(condition);
    return data;
  }

  async getRecordById(recordId: number) {
    const user = this.cls.get<IUserClsData>('user');
    const data = await this.dataServices.record.getOne({
      id: recordId,
      user: { id: user.id },
    });
    return data;
  }
}
