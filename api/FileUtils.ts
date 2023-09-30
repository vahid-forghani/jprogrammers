import * as fs from "fs";
import multer from "multer";

export class FileUtils {

  static filePath = process.env.FILE_PATH + '';
  static upload = multer({dest: this.filePath})

  public static fetchFile(name: string, callback: (error: any, data: any) => void): void {
    fs.readFile(this.filePath + name, callback);
  }

  static rename(from: string | undefined, to: string) {
    fs.rename(this.filePath + from, this.filePath + to, () => {});
  }
}
