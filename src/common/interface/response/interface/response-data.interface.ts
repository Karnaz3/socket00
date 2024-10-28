export interface IPaginationData {
  data: Array<any>;
  warnings?: any;
  total: number;
  limit: number;
  page: number;
  previous?: string;
  next?: string;
}
