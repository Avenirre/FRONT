import {EventEmitter, Injectable} from '@angular/core';
import {ProfileFolder} from '../../../models/profileFolder';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../../services/rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {SectionUnit} from '../../../enums/section.enum';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Applicant} from '../../../models/auth/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyFoldersService {
  isDownloading = true;
  downloadCompleted = new EventEmitter();
  currentFolder: ProfileFolder;
  _$currentFolder = new BehaviorSubject<ProfileFolder>(this.currentFolder);

  folders: ProfileFolder[];
  _$folders = new BehaviorSubject<ProfileFolder[]>(this.folders);

  section: SectionUnit;
  _$section = new BehaviorSubject<SectionUnit>(this.section);

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.getBackEndFolders();
  }

  public static defineSection(section): SectionUnit {
    switch (section) {
      case environment.routes.profileCompanySearch: {
        return SectionUnit.SEARCH;
      }
      case environment.routes.profileCompanySettings: {
        return SectionUnit.SETTINGS;
      }
      case environment.routes.profileCompanyFolders: {
        return SectionUnit.FOLDERS;
      }
    }
  }

  public async getBackEndFolders() {
    this.isDownloading = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    const response = await this._api
      .get(environment.api.getFolders, httpOptions)
      .toPromise();
    const folders = response['data'];
    this.folders = folders;
    this._$folders.next(folders);
    this.isDownloading = false;
    this.downloadCompleted.emit();
  }

  public getFolder(id: number): ProfileFolder {
    for (const folder of this.folders) {
      if (folder.id === id) {
        return folder;
      }
    }
    return null;
  }

  sectionChanged(paramSection: string) {
    this.section = CompanyFoldersService.defineSection(paramSection);
    this._$section.next(this.section);
  }

  setCurrentFolderById(id: number): boolean {
    const folder = this.getFolder(id);
    if (folder) {
      this.currentFolder = folder;
      this._$currentFolder.next(this.currentFolder);
      return true;
    }
    return false;
  }

  public isFolderExists(par: number | string): boolean {
    if (typeof par === 'number') {
      return this.isFolderIdExists(<number>par);
    } else if (typeof par === 'string') {
      return this.isFolderNameExists(<string>par);
    }
  }

  private isFolderIdExists(id: number): boolean {
    for (const folder of this.folders) {
      if (folder.id === id) {
        return true;
      }
    }
    return false;
  }

  private isFolderNameExists(name: string) {
    for (const folder of this.folders) {
      if (folder.nameFolder === name) {
        return true;
      }
    }
    return false;
  }

  public navigateToFolder(id: number): void {
    this._router.navigate([
      environment.routes.profileCompany,
      environment.routes.profileCompanyFolders,
      id
    ]);
  }

  navigateToDefaultFolder() {
    this._router.navigate([
      environment.routes.profileCompany,
      environment.routes.profileCompanyFolders,
      this.folders[0].id
    ]);
  }

  createFolder(name: string) {
    console.log(name);
    const folder = new ProfileFolder(1, name, null);
    console.log(folder);
    this.folders.push(folder);
    this._$folders.next(this.folders);
  }

  async editFolder(id: number, name: string) {
    const index = this.folders.findIndex((cur) => {
      return cur.id === id;
    });
    const editedFolder = this.folders[index];
    editedFolder.nameFolder = name;
    const resp = await this.apiEditFolder(editedFolder);
    console.log('resp:', resp);
    this.folders[index] = editedFolder;
  }

  async apiEditFolder(folder) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    const resp = await this._api
      .put<ProfileFolder>(
        environment.api.editFolder(folder.id),
        folder,
        httpOptions)
      .toPromise();
    console.log(resp);
  }
}



















