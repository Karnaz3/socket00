import { Controller, Get } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { DocUserUseCaseService } from 'src/use-cases/actors/doc-user-use-cases/doc-user-usecase.service';

@Controller('general')
export class GeneralDocController {
  constructor(private readonly useCaseService: DocUserUseCaseService) {}

  @Get('get-online')
  async getOnlineUsers() {
    return CoreApiResponse.success(await this.useCaseService.getOnlinDoceUsers());
  }
  @Get('get-offline')
  async getOfflineUsers() {
    return CoreApiResponse.success(await this.useCaseService.getOfflineDocUsers());
  }
  @Get('get-all')
  async getAllUsers() {
    return CoreApiResponse.success(await this.useCaseService.getAllDocUsers());
  }
  @Get('get-users')
  async getUsers() {
    return CoreApiResponse.success(await this.useCaseService.getUsers());
  }
}
