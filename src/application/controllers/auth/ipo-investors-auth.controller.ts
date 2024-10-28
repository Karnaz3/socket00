import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { User } from 'src/application/decorators/investor.decorator';
import { Public } from 'src/application/decorators/public.decorator';
import { AppClsStore, IInvestorClsData } from 'src/common/interface/app-cls-store.interface';
import { UserDto } from 'src/core/dtos/request/user.dto';

import { SigninDto, SigninWithGoogleDto } from 'src/core/dtos/request/signin.dto';
import { UserAuthUseCaseService } from 'src/use-cases/admin-use-cases/ipo-investors-use-cases/ipo-investor/ipo-investor-auth-use-case.service';
import { IpoInvestorUseCaseService } from 'src/use-cases/admin-use-cases/ipo-investors-use-cases/ipo-investor/ipo-investor-use-case.service';

@Controller('/users')
export class UserAuthController {
  constructor(
    private investorAuthUseCaseService: UserAuthUseCaseService,
    private investorUseCaseService: IpoInvestorUseCaseService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  @Public()
  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    return CoreApiResponse.success(await this.investorAuthUseCaseService.signin(signinDto), 200, 'Signin successful');
  }

  @Public()
  @Post('/signup')
  async signup(@Body() signinDto: UserDto) {
    return CoreApiResponse.success(await this.investorUseCaseService.createUser(signinDto), 200, 'Signup successful');
  }

  @Public()
  @Post('/signin-with-google')
  async signinWithGoogle(@Body() signinDto: SigninWithGoogleDto) {
    return CoreApiResponse.success(
      await this.investorAuthUseCaseService.signinWithGoogle(signinDto),
      200,
      'Signin successful',
    );
  }

  @User()
  @Get('/me')
  async me() {
    console.log(this.cls.get<IInvestorClsData>('investorUser'));
    return CoreApiResponse.success(this.cls.get<IInvestorClsData>('investorUser'));
  }
}

/**
 * for social signin
 * https://medium.com/@limcheekeen.63/social-sign-ins-for-flutter-with-nestjs-faa750cba015
 */
