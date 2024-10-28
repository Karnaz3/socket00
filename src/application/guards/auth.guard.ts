import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { IS_ADMIN_KEY } from '../decorators/admin.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import AppUnauthorizedException from '../exception/app-unauthorized.exception';
import { IS_USER_KEY } from '../decorators/investor.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: IJwtService,
    private _reflector: Reflector,
    private readonly cls: IClsStore<AppClsStore>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;

    // if is public set isPublic to true and return
    const isPublic =
      this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]) ||
      requestUrl.startsWith('/api/pre-ipo/public')
        ? true
        : false;
    if (isPublic) {
      this.cls.set('isPublic', true);
      return true;
    }

    const isAdmin =
      this._reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [context.getHandler(), context.getClass()]) ||
      requestUrl.startsWith('/api/pre-ipo/admin')
        ? true
        : false;

    const isUser =
      this._reflector.getAllAndOverride<boolean>(IS_USER_KEY, [context.getHandler(), context.getClass()]) ||
      requestUrl.startsWith('/api/pre-ipo/ipo-investors')
        ? true
        : false;

    this.cls.set('isPublic', isPublic);
    this.cls.set('isAdmin', isAdmin);
    this.cls.set('isUser', isUser);
    if (isPublic) {
      return true;
    }
    if (isAdmin || isUser) {
      const token = this.extractTokenFromHeader(request);
      if (!token || token === 'null' || token === 'undefined') {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      } else {
        try {
          const payload: any = await this._jwtService.checkToken<any>(token.trim());
          if (!payload) {
            throw new AppUnauthorizedException('Invalid token. Please login again.');
          }
          this.cls.set('payload', payload);
          return true;
        } catch (error) {
          throw new AppUnauthorizedException(JSON.stringify(error));
        }
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
