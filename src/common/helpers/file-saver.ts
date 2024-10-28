import fs from 'fs';
import path from 'path';
export function formatFileName(file: Express.Multer.File) {
  const filename = `${file.originalname}-${Date.now()}`;
  filename.replace(/ /g, '-');
  return filename;
}
export function saveFile(file: Express.Multer.File, fileName: string) {
  const filePath = path.join(process.cwd(), '/uploads') + `/${fileName}`;
  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      console.log('error is', err);
    }
    console.log('file saved in db successfully');
  });
}
