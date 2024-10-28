import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interface/jwt-playload.interface';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async createResetPasswordToken(payload: any) {
    // expires in 5 minutes
    const exp = 60 * 5;
    return this.jwtService.signAsync(payload, { expiresIn: exp });
  }
}
