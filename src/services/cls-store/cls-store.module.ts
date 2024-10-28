import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { ClsStoreService } from './cls-store.service';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
        setup: (cls, context) => {
          const req = context.switchToHttp().getRequest();
          cls.set('paginationQuery', req.query as IPaginationQuery);
        },
      },
    }),
  ],
  providers: [
    {
      provide: IClsStore,
      useClass: ClsStoreService,
    },
  ],
  exports: [IClsStore],
})
export class ClsServiceModule {}
