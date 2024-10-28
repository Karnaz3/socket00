import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';

@Injectable()
export class AdminUserInvestorUseCaseService {
  constructor(private dataService: IDataServices) {}

  async getInvestorList() {
    return await this.dataService.user.getAll();
  }

  async getInvestorById(id: string) {
    return await this.dataService.user.getOne({ id });
  }
}
