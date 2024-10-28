import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { FileModel } from 'src/core/models/file.model';
import { UploadFileService } from './file-upload.service';
import { FileNameChageDto } from 'src/core/dtos/request/file.dto';
import { generateFilePath } from 'src/common/utils/path-generator';

@Injectable()
export class UploadFileUseCaseService {
  constructor(
    private dataService: IDataServices,
    private uploadFileService: UploadFileService,
  ) {}

  async uploadFile(file: Express.Multer.File, fileName?: string) {
    let finalFileName: string;
    if (fileName) {
      finalFileName = this.uploadFileService.formatString(fileName || file.filename);
      // add extension to the file with . if it does not have one
      if (!finalFileName.includes('.')) {
        finalFileName = finalFileName + '.' + file.mimetype.split('/')[1];
      }
    } else {
      finalFileName = this.uploadFileService.formatFileName(file);
    }
    await this.uploadFileService.saveFile(file, finalFileName);
    const fileModel = new FileModel();
    fileModel.name = finalFileName;
    fileModel.fileType = file.mimetype;
    fileModel.path = generateFilePath(finalFileName, 'http://localhost:8080');
    return await this.dataService.file.create(fileModel);
  }

  async updateFileName(dto: FileNameChageDto) {
    const oldFile = await this.dataService.file.getOne({ id: dto.fileId });
    oldFile.name = dto.newFileName;
    return await this.dataService.file.update({ id: dto.fileId }, oldFile);
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    // Check if files is an array and not empty
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files were uploaded or files is not an array');
    }
    const response = await Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file);
      }),
    );
    return response;
  }
}
