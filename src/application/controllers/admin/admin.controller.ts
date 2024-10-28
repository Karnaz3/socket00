import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Roles } from 'src/application/decorators/role.decorator';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';
import { CreateAdminDto, UpdateAdminDto } from 'src/core/dtos/request/admin.dto';
import { AdminUserUseCaseService } from 'src/use-cases/admin-use-cases/admin-user/admin-user-use-case.service';

@Controller('admin-user')
export class AdminController {
  constructor(private adminUseCaseService: AdminUserUseCaseService) {}

  @Post()
  @Roles(AdminRoleEnum.SUPER_ADMIN)
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.createAdmin(createAdminDto),
      201,
      'Admin created successfully',
    );
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.updateAdmin(id, updateAdminDto),
      200,
      'Admin updated successfully',
    );
  }

  @Get()
  async getAllAdmin(@Query() query: IPaginationQuery) {
    return CoreApiResponse.pagination(await this.adminUseCaseService.getAllAdmin(), query);
  }

  @Get(':id')
  async getAdmin(@Param('id') id: string) {
    return CoreApiResponse.success(await this.adminUseCaseService.getAdmin(id));
  }
}
