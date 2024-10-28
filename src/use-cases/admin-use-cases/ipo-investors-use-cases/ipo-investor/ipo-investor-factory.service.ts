import { Injectable } from '@nestjs/common';
import { UserDto, UpdateUserDto, UpdateUserPasswordDto } from 'src/core/dtos/request/user.dto';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: UserDto) {
    const user = new UserModel();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return user;
  }

  updateInvestor(updateAdminDto: UpdateUserDto) {
    const newUser = new UserModel();
    newUser.name = updateAdminDto.name;
    newUser.avatar = updateAdminDto.avatar;
    return newUser;
  }

  updateInvestorPassword(updateAdminPasswordDto: UpdateUserPasswordDto) {
    const newUser = new UserModel();
    newUser.password = updateAdminPasswordDto.newPassword;
    return newUser;
  }
}
