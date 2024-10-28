import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { FileNameChageDto } from 'src/core/dtos/request/file.dto';
import { UploadFileUseCaseService } from 'src/use-cases/upload-file/uploadfile-usecase.service';

@Controller('file')
export class FileUploadController {
  constructor(private uploadUsecase: UploadFileUseCaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /(jpg|jpeg|png|gif|png|pdf|docx|xlsx|ppt|pptxwebp|svg|ico|heic|raw|doc|docx|xls|xlsx|ppt|pptx|odt|ods|odp|txt|rtf|csv|xml|)$/, // Add or modify file types as needed
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB max size (adjust as needed)
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Body('fileName') fileName: string,
  ) {
    return CoreApiResponse.success(await this.uploadUsecase.uploadFile(file, fileName || file.filename));
  }

  @Patch()
  async updateFileName(@Body() dto: FileNameChageDto) {
    return CoreApiResponse.success(await this.uploadUsecase.updateFileName(dto));
  }

  @Post('multiple-upload')
  @UseInterceptors(FilesInterceptor('files', 10)) // 10 is the max number of files, adjust as needed
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /(jpg|jpeg|png|gif|png|pdf|docx|xlsx|ppt|pptx|webp|svg|ico|heic|raw|doc|docx|xls|xlsx|ppt|pptx|odt|ods|odp|txt|rtf|csv|xml)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB max size
        })
        .build({
          fileIsRequired: false,
        }),
    )
    files: Express.Multer.File[],
  ) {
    return CoreApiResponse.success(await this.uploadUsecase.uploadMultipleFiles(files));
  }
}
