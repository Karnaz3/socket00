export interface IUploadResponse {
  response: any;
  imageUrl: string;
}
export abstract class IUploadService {
  //   abstract imageUrl: string;
  abstract uploadFile(file: any, folder: string): Promise<IUploadResponse>;
}
