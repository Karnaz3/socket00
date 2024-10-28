import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

@Injectable()
export class UploadFileService {
  private uploadPath: string;

  constructor() {
    this.uploadPath = path.join(process.cwd(), 'uploads');
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists(): void {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  formatFileName(file: Express.Multer.File): string {
    const fileExtension = path.extname(file.originalname);
    const baseFileName = path.basename(file.originalname, fileExtension);
    const timestamp = Date.now();
    const sanitizedFileName = `${timestamp}-${baseFileName}`.replace(/ /g, '-');
    return `${sanitizedFileName}${fileExtension}`;
  }
  // formatFileName(file: Express.Multer.File): string {
  //   let filename = `${Date.now()}-${file.originalname}`;
  //   return filename.replace(/ /g, '-');
  // }

  formatString(fileName: string): string {
    if (!fileName) return fileName;
    fileName = fileName + `${Date.now()}}`;
    // remove spaces and replace with hyphens as well as remove unwanted characters
    return fileName.replace(/[^a-zA-Z0-9-]/g, '');
  }

  async saveFile(file: Express.Multer.File, fileName: string): Promise<void> {
    const filePath = path.join(this.uploadPath, fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error('Error saving file:', err);
          reject(err);
        } else {
          console.log('File saved successfully');
          resolve();
        }
      });
    });
  }
}
