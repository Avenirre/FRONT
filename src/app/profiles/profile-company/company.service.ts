import { Injectable } from '@angular/core';
import {CompanyFolder} from '../../../models/company.folder';
import {Subject} from 'rxjs';
import {CV} from '../../../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  foldersChanged = new Subject<CompanyFolder[]>();
  folderSelected = new Subject<CompanyFolder>();
  currentFolderIndex: number;
  folders = [
    new CompanyFolder('Frontend Developer', [
      new CV()
    ]),
    new CompanyFolder('Backend Developer', [
      new CV(),
      new CV()
    ]),
    new CompanyFolder('Designer', [
      new CV()
    ]),
  ];

  constructor() { }

  public getFolders(): CompanyFolder[] {
    return this.folders;
  }

  public getCurentFolder(): CompanyFolder {
    return this.folders[this.currentFolderIndex] || this.folders[0];
  }

  public getFoldersNames(): string[] {
    return this.folders.map((folder: CompanyFolder) => {
      return folder.name;
    });
  }

  public emitFoldersChange(): void {
    this.foldersChanged.next(this.folders);
  }

  public selectFolder(index: number): void {
    this.currentFolderIndex = index;
    this.folderSelected.next(this.folders[index]);
  }
}
