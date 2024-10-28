export interface CreateUpdateResponse<T> {
  data: T;
  status: 200 | 201 | 204;
}
