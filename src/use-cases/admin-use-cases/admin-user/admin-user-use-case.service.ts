import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IPaginationData } from 'src/common/interface/response/interface/response-data.interface';
import { IDataServices } from 'src/core/abstracts';
import { CreateAdminDto, UpdateAdminDto, UpdateAdminPasswordDto } from 'src/core/dtos/request/admin.dto';
import { AdminModel } from 'src/core/models';
import { AdminUserFactoryService } from './admin-user-factory.service';

@Injectable()
export class AdminUserUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private adminFactory: AdminUserFactoryService,
  ) {}

  async getAllAdmin(): Promise<IPaginationData> {
    return await this.dataServices.admin.getAll();
  }

  async getAdmin(id: string): Promise<AdminModel> {
    return await this.dataServices.admin.getOne({
      id: +id,
    });
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminModel> {
    const admin = this.adminFactory.createNewAdmin(createAdminDto);
    const oldAdmin = await this.dataServices.admin.getOneOrNull({
      email: createAdminDto.email,
    });
    if (oldAdmin) {
      throw new AppException({ email: `${createAdminDto.email} already exists` }, 'Email already exists', 409);
    }
    return await this.dataServices.admin.create(admin);
  }

  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): Promise<AdminModel> {
    const newAdmin = this.adminFactory.updateAdmin(updateAdminDto);
    return await this.dataServices.admin.update({ id: adminId }, newAdmin);
  }

  async updateAdminPassword(adminId: string, updateAdminPasswordDto: UpdateAdminPasswordDto): Promise<AdminModel> {
    const admin = await this.dataServices.admin.getOne({ id: +adminId });
    if (!admin) {
      throw new Error('Admin not found');
    } else {
      if (admin.password === updateAdminPasswordDto.oldPassword) {
        const newAdmin = this.adminFactory.updateAdminPassword(updateAdminPasswordDto);
        return await this.dataServices.admin.update({ id: adminId }, newAdmin);
      } else {
        throw new Error('Wrong password');
      }
    }
  }
}
