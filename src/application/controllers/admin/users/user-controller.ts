import { Controller, Get, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AdminUserInvestorUseCaseService } from 'src/use-cases/admin-use-cases/admin-user/admin-user-investor-usecase.service';

@Controller('users')
export class UsersController {
  constructor(private investorUseCase: AdminUserInvestorUseCaseService) {}

  @Get('list')
  async getInvestorList() {
    return CoreApiResponse.success(await this.investorUseCase.getInvestorList());
  }

  @Get('view/:id')
  async getInvestorById(@Param('id') id: string) {
    return CoreApiResponse.success(await this.investorUseCase.getInvestorById(id));
  }
}
