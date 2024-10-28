import { IResponseResult } from './interface/response.result.interface';

export class AppResponse<ResponseEntity> {
  public statusCode: number;
  public message: string;
  public data: ResponseEntity;
  public timestamp: Date;

  constructor(paginationResults: IResponseResult<ResponseEntity>) {
    this.statusCode = paginationResults.statusCode;
    this.timestamp = new Date();
    this.message = paginationResults.message;
    this.data = paginationResults.data;
  }
}
