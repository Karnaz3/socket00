import { ClsService } from 'nestjs-cls';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IPaginationQuery } from 'src/common/interface/response/interface/pagination.options.interface';
import { AppPagination } from '../../common/interface/response/app-pagination';
import { AppResponse } from '../../common/interface/response/app-response';
import { IPaginationData } from '../../common/interface/response/interface/response-data.interface';

export abstract class CoreApiResponse {
  constructor(private readonly cls: ClsService<AppClsStore>) {}
  static success<TData>(data: TData, statusCode: number = 200, message: string = 'success') {
    return new AppResponse({
      data: data,
      statusCode,
      message,
    });
  }
  static pagination(
    paginationData: IPaginationData,
    query: IPaginationQuery,
    statusCode: number = 200,
    message: string = 'success',
  ) {
    return new AppPagination({
      ...paginationData,
      ...query,
      statusCode,
      message: message,
    });
  }
}

export abstract class CoreWsResponse {
  static success<T>(data: T) {
    return {
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
