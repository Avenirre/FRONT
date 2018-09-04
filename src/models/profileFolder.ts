import {CV} from './cv.model';

export class ProfileFolder {
  public name: string;
  public cvs: CV[];

  constructor(name: string, cvs: CV[]) {
    this.name = name;
    this.cvs = cvs;
  }

  public addCv(cv: CV) {
    this.cvs.push(cv);
  }
}
