import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IBcryptService } from 'src/core/abstracts/adapters/bcrypt.abstract';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { SigninDto, SigninWithGoogleDto } from 'src/core/dtos/request/signin.dto';
import { UserModel } from 'src/core/models/user.model';
import { UserSignInResponseType } from 'src/use-cases/admin-use-cases/admin-user/types/user-signin-response';
@Injectable()
export class UserAuthUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private readonly _jwtService: IJwtService,
    private readonly bcryptService: IBcryptService,
  ) {}

  async getIpoInvestorByEmail(email: string): Promise<UserModel> {
    return await this.dataServices.user.getOne({ email: email });
  }

  async signin(signinDto: SigninDto): Promise<UserSignInResponseType> {
    const user = await this.dataServices.user.getOneOrNull({
      email: signinDto.email,
    });
    if (!user) {
      throw new AppException({}, 'Email Dosent Exist', 400);
    }
    if (user && !(await this.bcryptService.compare(signinDto.password, user.password))) {
      throw new AppException({}, 'Incorrect Email or Password', 400);
    } else {
      const payload = { sub: user.email };
      const accessToken = await this._jwtService.createToken(payload);

      return { accessToken, user: user };
    }
  }

  async signinWithGoogle(signinDto: SigninWithGoogleDto): Promise<UserSignInResponseType> {
    // TODO: reverification of google token
    // const decodedToken = await this.firebaseGoogleService.checkGoogleToken(signinDto.token);
    let user = await this.dataServices.user.getOneOrNull({ email: signinDto.email });
    if (!user) {
      // create user
      const investor = new UserModel();
      investor.email = signinDto.email;
      investor.name = signinDto.name;
      investor.isGoogleLogin = true;
      investor.googleAccessToken = signinDto.token;

      user = await this.dataServices.user.create(investor);
    }
    const payload = { sub: user.email };
    const accessToken = await this._jwtService.createToken(payload);

    return { accessToken, user: user };
  }

  // async sendNotification() {
  //   const devices = await this.dataServices.investorLoginDevices.getAllWithoutPagination();
  //   const fcmTokens = devices.map((device) => device.fcmToken);
  //   return await this.firebaseGoogleService.sendNotification(fcmTokens, 'title', 'body');
  // }
}
