export type ResponseDto = {
  statusCode: number;
  timestamp: string;
  message: string;
  path?: string;
  data?: object | [];
  error?: object | string;
  metadata?: object;
};
