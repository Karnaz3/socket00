import { CanActivate, Injectable } from '@nestjs/common';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import AppUnauthorizedException from '../exception/app-unauthorized.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly cls: IClsStore<AppClsStore>,
    private readonly dataServices: IDataServices,
  ) {}

  async canActivate(): Promise<boolean> {
    const isPublic = this.cls.get<boolean>('isPublic');
    if (isPublic) {
      return true;
    }
    const isAdmin = this.cls.get<boolean>('isAdmin');
    const isUser = this.cls.get<boolean>('isUser');
    const isDoc = this.cls.get<boolean>('isDoc');

    if (isAdmin) {
      const payload = this.cls.get<any>('payload');
      if (!payload) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      const admin = await this.dataServices.admin.getOneOrNull({ email: payload.sub });
      if (!admin) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      this.cls.set('adminUser', admin);
    } else if (isUser) {
      const payload = this.cls.get<any>('payload');

      if (!payload) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      const user = await this.dataServices.user.getOneOrNull({ email: payload.sub });
      if (!user) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      this.cls.set('user', {
        id: user.id,
        email: user.email,
        password: user.password,
      });
      return true;
    } else if (isDoc) {
      const payload = this.cls.get<any>('payload');
      if (!payload) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      const doc = await this.dataServices.user.getOneOrNull({ email: payload.sub, isAdmin: true });
      if (!doc) {
        throw new AppUnauthorizedException('Invalid token. Please login again.');
      }
      this.cls.set('doc', {
        id: doc.id,
        email: doc.email,
      });
      return true;
    }
  }
}
