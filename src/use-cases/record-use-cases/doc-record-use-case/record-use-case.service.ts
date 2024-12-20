import { Injectable } from '@nestjs/common';
import { ReportStatusEnum } from 'src/common/enums/report-status.enum';
import { IDataServices } from 'src/core/abstracts';
import { CreateRecordtDto } from 'src/core/dtos/records-request/record.dto';
import { AdminRecordFactoryUseCaseService } from './record-factory-use-case.service';

@Injectable()
export class AdminRecordUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly factoryService: AdminRecordFactoryUseCaseService,
  ) {}

  async createRecord(dto: CreateRecordtDto) {
    const record = this.factoryService.createReport(dto);
    return await this.dataServices.record.create(record);
  }

  async getRecords(query: { status: ReportStatusEnum }) {
    let condition = {};
    if (query.status) {
      condition = {
        status: query.status,
      };
    }
    const data = await this.dataServices.record.getAllWithoutPagination(condition);
    return data;
  }

  async updateRecord(dto: CreateRecordtDto) {
    const record = await this.dataServices.record.getOne({
      id: dto.id,
    });
    const updatedRecord = this.factoryService.updateReport(record, dto);
    return await this.dataServices.record.update({ id: dto.id }, updatedRecord);
  }

  async removeRecord(id: number) {
    const recording = await this.dataServices.record.getOne({ id });
    return await this.dataServices.record.remove({ id: recording.id });
  }
}
