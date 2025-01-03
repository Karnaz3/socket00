import { Controller, Get } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserUseCaseService } from 'src/use-cases/actors/user-use-cases/user-usecase.service';

@Controller('general')
export class GeneralUserController {
  constructor(private readonly useCaseService: UserUseCaseService) {}

  @Get('get-online')
  async getOnlineUsers() {
    return CoreApiResponse.success(await this.useCaseService.getOnlineUsers());
  }
  @Get('get-offline')
  async getOfflineUsers() {
    return CoreApiResponse.success(await this.useCaseService.getOfflineUsers());
  }
  @Get('get-all')
  async getAllUsers() {
    return CoreApiResponse.success(await this.useCaseService.getAllUsers());
  }
}
