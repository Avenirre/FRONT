import {Injectable} from '@angular/core';
import {ProfileFolder} from '../../../models/profileFolder';
import {Subject} from 'rxjs';
import {CV} from '../../../models/cv/cv.model';
import {ApiService} from '../../../services/rest/api.service';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  api = environment.api;
  currentFolder: number;
  checkedCount = 0;
  checkedChanged = new Subject();
  folderChanged = new Subject<string>();
  foldersChanged = new Subject<ProfileFolder[]>();
  foldersNamesChanged = new Subject<{ id: number, name: string }[]>();

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

  constructor(
    private apiService: ApiService
  ) {
    // this.downloadFolders();
  }

  private downloadFolders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    this.apiService.get(this.api.getFolders, httpOptions).subscribe(
      (folders) => {
        this.folders = <ProfileFolder[]>folders['data'];
        console.log(this.folders);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getFolders(): ProfileFolder[] {
    return this.folders;
  }

  /**
   * returns folder by given folder id;
   * @param id
   */
  getFolderById(id: number): ProfileFolder {
    return this.folders.find((current) => {
      return current.id === id;
    });
  }

  /**
   * returns folder by given folder name;
   * @param name
   */
  getFolderByName(name: string): ProfileFolder {
    return this.folders.find((current) => {
      return current.name === name;
    });
  }

  /**
   * returns array of names and id-s of all user-folders;
   */
  public getFoldersNames(): { id: number, name: string }[] {
    return this.folders.map((folder: ProfileFolder) => {
      const id: number = folder.id;
      const name: string = folder.name;
      return {id, name};
    });
  }

  /**
   * set current folder, chosen by user;
   * @param folder
   */
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

  /**
   * create new empty folder in folders array;
   * @param folderName
   */
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

  /**
   * checks if folder with given name exists;
   * @param folder
   */
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

  /**
   * edit name of folder by given folder id;
   * @param id
   * @param name
   */
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

  /**
   * delete folder with given id from folders array;
   * @param id
   */
  deleteFolder(id: number) {
    const index = this.folders.findIndex((c) => {
      return c.id === id;
    });
    if (this.folders.length <= 1) {
      this.folders[index].cvs = [];
    } else {
      if (index !== -1) {
        this.folders.splice(index, 1);
      }
      this.emitFoldersChanges();

    }
  }

  /**
   * emit folders and folder names arrays to the subscribers;
   */
  emitFoldersChanges() {
    this.foldersNamesChanged.next(this.getFoldersNames());
    const foldersNames = this.getFoldersNames();
    this.foldersNamesChanged.next(foldersNames);

  }
}



















