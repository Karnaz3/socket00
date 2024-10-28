export interface IResponseResult<ResponseEntity> {
  statusCode: number;
  message: string;
  data: ResponseEntity;
}
