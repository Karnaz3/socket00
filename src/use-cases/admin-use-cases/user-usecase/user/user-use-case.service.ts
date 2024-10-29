import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IBcryptService } from 'src/core/abstracts/adapters/bcrypt.abstract';
import { UserDto, UpdateUserDto, UpdateUserPasswordDto } from 'src/core/dtos/request/user.dto';
import { UserModel } from 'src/core/models/user.model';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class IpoInvestorUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private userFactory: UserFactoryService,
    private readonly bcryptService: IBcryptService,
  ) {}

  async createUser(dto: UserDto): Promise<UserModel> {
    const user = this.userFactory.createNewUser(dto);
    const oldUser = await this.dataServices.user.getOneOrNull({ email: user.email });
    if (oldUser) {
      throw new AppException({ email: `${user.email} already exists` }, 'email already exists', 409);
    }
    user.password = await this.bcryptService.hash(user.password);
    return await this.dataServices.user.create(user);
  }

  async updateUser(dto: UpdateUserDto): Promise<UserModel> {
    const newInvestor = this.userFactory.updateUser(dto);
    return await this.dataServices.user.update({ id: dto.id }, newInvestor);
  }

  async updateUserPassword(dto: UpdateUserPasswordDto): Promise<UserModel> {
    const investor = await this.dataServices.user.getOne({ id: +dto.id });
    if (!investor) {
      throw new Error('Investor not found');
    } else {
      if (investor.password === dto.oldPassword) {
        const newInvestor = this.userFactory.updateUserPassword(dto);
        return await this.dataServices.user.update({ id: dto.id }, newInvestor);
      } else {
        throw new Error('Wrong password');
      }
    }
  }
}
