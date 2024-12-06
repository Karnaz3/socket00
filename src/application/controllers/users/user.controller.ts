import { Body, Controller, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-usecase.service';

@Controller('private')
export class UserController {
  constructor(private readonly userUseCaseService: UserUseCaseService) {}

  @Post('all')
  async getAllUsers(@Body() dto: { userId: string }) {
    return CoreApiResponse.success(await this.userUseCaseService.getAllUsers(dto));
  }
}
