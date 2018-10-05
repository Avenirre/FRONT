import {CV} from './cv/cv.model';

export class ProfileFolder {
  public id: number;
  public nameFolder: string;
  public cvs: CV[];

  constructor(id: number, nameFolder: string, cvs: CV[]) {
    this.id = id;
    this.nameFolder = nameFolder;
    this.cvs = cvs;
  }

  public addCv(cv: CV) {
    this.cvs.push(cv);
  }
}
