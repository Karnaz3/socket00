import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppResponse } from '../../common/interface/response/app-response';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<AppResponse<void>> {
    const request: Request = context.switchToHttp().getRequest();
    const requestStartDate: number = Date.now();

    return next.handle().pipe(
      tap((): void => {
        const requestFinishDate: number = Date.now();
        let message: string =
          `Method: ${request.method}; ` +
          `Path: ${request.path}; ` +
          `SpentTime: ${requestFinishDate - requestStartDate}ms`;

        if (process.env.DEBUG == 'true') {
          message += ` Body: ${JSON.stringify(request.body)}`;
        }

        Logger.log(message, HttpLoggingInterceptor.name);
      }),
    );
  }
}
