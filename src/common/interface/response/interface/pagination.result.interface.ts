export default interface IPaginationResponse<PaginationEntity> {
  statusCode?: number;
  message?: string;
  data: PaginationEntity[];
  warnings?: any;
  total: number;
  next?: string;
  previous?: string;
  page?: number;
  limit?: number;
}
