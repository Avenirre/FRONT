import {CV} from './cv/cv.model';

export class ProfileFolder {
  public id: number;
  public name: string;
  public cvs: CV[];

  constructor(id: number, name: string, cvs: CV[]) {
    this.id = id;
    this.name = name;
    this.cvs = cvs;
  }

  public addCv(cv: CV) {
    this.cvs.push(cv);
  }
}
