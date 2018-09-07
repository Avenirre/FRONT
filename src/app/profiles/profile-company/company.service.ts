import {Injectable} from '@angular/core';
import {ProfileFolder} from '../../../models/profileFolder';
import {Subject} from 'rxjs';
import {CV} from '../../../models/cv/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  currentFolder: number;
  checkedCount = 0;
  checkedChanged = new Subject();
  folderChanged = new Subject<string>();
  foldersChanged = new Subject<ProfileFolder[]>();
  foldersNamesChanged = new Subject<{id: number, name: string}[]>();

  folders: ProfileFolder[] = [
    new ProfileFolder(0, 'Frontend Developer', [
      new CV()
    ]),
    new ProfileFolder(1, 'Backend Developer', [
      new CV(),
      new CV()
    ]),
    new ProfileFolder(2, 'Designer', [
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
  public getFoldersNames(): {id: number, name: string}[] {
    return this.folders.map((folder: ProfileFolder) => {
      const id: number = folder.id;
      const name: string = folder.name;
      return {id, name};
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
    this.checkedChanged.next(this.checkedCount);
  }

  createFolder(folderName: string) {
    const id = this.findFolderId();
    const newFolder = new ProfileFolder(id, folderName, []);
    this.folders.push(newFolder);
    this.foldersChanged.next(this.folders);

    const foldersNames = this.getFoldersNames();
    this.foldersNamesChanged.next(foldersNames);
    console.log(this.folders);
  }

  /**
   * finds unique empty local id of new folder;
   */
  private findFolderId(): number {
    let id = 0;
    this.folders.forEach((current) => {
      if (current.id > id) {
        id = current.id++;
      }
    });
    return id;
  }

  public isFolderExists(folder: string): boolean {
    if (!folder) {
      return false;
    }
    let res = false;
    this.folders.forEach((current) => {
      if (current.name === folder) {
        res = true;
      }
    });
    return res;
  }

  editFolder(id: number, name: string) {
    const folderIndex = this.folders.findIndex((c) => {
      return c.id === id;
    });
    this.folders[folderIndex].name = name;
    this.sendFolders();
    console.log(this.folders);
  }

  private sendFolders() {
    this.foldersNamesChanged.next(this.getFoldersNames());
  }

  deleteFolder(id: number) {
    const index = this.folders.findIndex((c) => {
      return c.id === id;
    });
    this.folders = this.folders.splice(index, 1);
    this.emitFoldersChanges();
  }

  emitFoldersChanges() {
    this.foldersNamesChanged.next(this.getFoldersNames());
    const foldersNames = this.getFoldersNames();
    this.foldersNamesChanged.next(foldersNames);

  }
}



















