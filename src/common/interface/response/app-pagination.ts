import PaginationResultInterface from './interface/pagination.result.interface';

export class AppPagination<PaginationEntity> {
  public statusCode: number;
  public message: string;
  public data: PaginationEntity[];
  public meta: any;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.statusCode = paginationResults.statusCode || 200;
    this.message = paginationResults.message || 'OK';
    this.data = paginationResults.data;

    const page = +paginationResults.page || 1;
    const limit = +paginationResults.limit || 10;
    const total_pages = Math.ceil(paginationResults.total / limit);

    this.meta = {
      limit: limit,
      total: paginationResults.total,
      page_total: paginationResults.data.length,
      total_pages: total_pages,
      next: page < total_pages ? page + 1 : null,
      page: page,
      previous: page > 1 && page <= total_pages ? page - 1 : null,
    };
  }
}
