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
  createNewDocUser(createUserDto: UserDto) {
    const user = new UserModel();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.isAdmin = true;
    return user;
  }

  updateUser(updateAdminDto: UpdateUserDto) {
    const newUser = new UserModel();
    newUser.name = updateAdminDto.name;
    newUser.avatar = updateAdminDto.avatar;
    return newUser;
  }

  updateUserPassword(updateAdminPasswordDto: UpdateUserPasswordDto) {
    const newUser = new UserModel();
    newUser.password = updateAdminPasswordDto.newPassword;
    return newUser;
  }
}
