import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Admin } from 'src/application/decorators/admin.decorator';
import { Public } from 'src/application/decorators/public.decorator';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';

import { CheckTokenDto, SigninDto } from 'src/core/dtos/request/signin.dto';
import { AdminEntity } from 'src/frameworks/data-services/pg/entities';
import { AdminUserAuthUseCaseService } from 'src/use-cases/admin-use-cases/admin-user/admin-user-auth-use-case.service';

@Controller('/admin')
export class AdminAuthController {
  constructor(
    private adminAuthUseCaseService: AdminUserAuthUseCaseService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  @Public()
  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    return CoreApiResponse.success(await this.adminAuthUseCaseService.signin(signinDto), 200, 'Signin successful');
  }

  @Public()
  @Post('/is-valid-token')
  async isValidToken(@Body() dto: CheckTokenDto) {
    return CoreApiResponse.success(await this.adminAuthUseCaseService.isValidToken(dto), 200, 'Token is valid');
  }
  @Admin()
  @Get('/me')
  async me() {
    console.log('me');
    return CoreApiResponse.success(this.cls.get<AdminEntity>('adminUser'));
  }
}
