import {Injectable} from '@angular/core';
import {ProfileFolder} from '../../../models/profileFolder';
import {Subject} from 'rxjs';
import {CV} from '../../../models/cv/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  checkedCount = 0;
  checkedChanged = new Subject();
  folderChanged = new Subject<string>();
  folders = [
    new ProfileFolder('Frontend Developer', [
      new CV()
    ]),
    new ProfileFolder('Backend Developer', [
      new CV(),
      new CV()
    ]),
    new ProfileFolder('Designer', [
      new CV(),
      new CV(),
      new CV(),
    ]),
  ];

  constructor() { }

  public getFolders(): ProfileFolder[] {
    return this.folders;
  }

  getFolder(folderName: string): ProfileFolder {
    return this.folders.find((current) => {
      return current.name === folderName;
    });
  }

  /**
   * returns array of names of all user foders;
   */
  public getFoldersNames(): string[] {
    return this.folders.map((folder: ProfileFolder) => {
      return folder.name;
    });
  }

  setCurrentFolder(folder: string) {
    this.folderChanged.next(folder);
  }

  cvCheckboxPressed(state: boolean) {
    if (state) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
    this.checkedChanged.next(this.checkedCount);
  }

  resetCheckedCount() {
    this.checkedCount = 0;
  }
}



















