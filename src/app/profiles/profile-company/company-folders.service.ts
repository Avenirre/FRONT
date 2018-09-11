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

// TESTING IMPORT
import {testingFolders} from '../../testing/folders.testing';
import {AuthService} from '../../auth/auth.service';

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

  checkedCvs: number[] = [];
  _$checkedFoldersChanged = new BehaviorSubject(this.checkedCvs);

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService
  ) {
    // try {
      this.apiGetFolders();
    // } catch (error) {
    //   console.log(error);
    // }
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

  /**
   * returns folder by given folder id
   * @param id
   */
  public getFolder(id: number): ProfileFolder {
    for (const folder of this.folders) {
      if (folder.id === id) {
        return folder;
      }
    }
    return null;
  }

  /**
   * set current section[settings, search or folders] and emits Observable
   * with changed section value;
   * @param paramSection
   */
  sectionChanged(paramSection: string) {
    this.section = CompanyFoldersService.defineSection(paramSection);
    this._$section.next(this.section);
  }

  /**
   * sets value of current folder on folder with given id and emits changes Observable;
   * @param id
   */
  setCurrentFolderById(id: number): boolean {
    const folder = this.getFolder(id);
    if (folder) {
      this.currentFolder = folder;
      this._$currentFolder.next(this.currentFolder);
      return true;
    }
    return false;
  }

  /**
   * receives parameter which can be number - id or string - name and checks,
   * that folder with given id/name exists in folders array;
   * * returns true if folder exists and false if folder does not exists;
   * @param par
   */
  public isFolderExists(par: number | string): boolean {
    if (typeof par === 'number') {
      return this.isFolderIdExists(<number>par);
    } else if (typeof par === 'string') {
      return this.isFolderNameExists(<string>par);
    }
  }

  /**
   * checks that folders with given id exists in folders array;
   * returns true if folder exists and false if folder does not exists;
   * @param id
   */
  private isFolderIdExists(id: number): boolean {
    for (const folder of this.folders) {
      if (folder.id === id) {
        return true;
      }
    }
    return false;
  }

  /**
   * checks that folders with given name exists in folders array;
   * * returns true if folder exists and false if folder does not exists;
   * @param name
   */
  private isFolderNameExists(name: string) {
    for (const folder of this.folders) {
      if (folder.nameFolder === name) {
        return true;
      }
    }
    return false;
  }

  /**
   * redirects to folder page chosen by given id;
   * @param id
   */
  public navigateToFolder(id: number): void {
    this._router.navigate([
      environment.routes.profileCompany,
      environment.routes.profileCompanyFolders,
      id
    ]);
  }

  /**
   * redirects to the page of first existing in folders array folder;
   */
  navigateToDefaultFolder() {
    this._router.navigate([
      environment.routes.profileCompany,
      environment.routes.profileCompanyFolders,
      this.folders[0].id
    ]);
  }

  // CRUD FOLDERS METHODS

  /**
   * creates folder with given name and inserts it into local folders array;
   * TODO api create method: method must make request to create folder to back api and receive created folder, which must include proper folder id and push it into folders array;
   * @param name
   */
  createFolder(name: string) {
    console.log(name);
    const folder = new ProfileFolder(1, name, null);
    console.log(folder);
    this.folders.push(folder);
    this._$folders.next(this.folders);
  }

  /**
   * sets given name to the local folder with given id;
   * makes request to api;
   * @param id
   * @param name
   */
  async editFolder(id: number, name: string) {
    const index = this.folders.findIndex((cur) => {
      return cur.id === id;
    });
    const editedFolder = this.folders[index];
    editedFolder.nameFolder = name;
    try {
      const resp = await this.apiEditFolder(editedFolder);
      console.log('resp:', resp);
      this.folders[index] = editedFolder;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * deletes folder by given id from local folders array and makes request to
   * delete folder with given id from backend database;
   * @param id
   */
  deleteFolder(id: number) {
    const index = this.folders.findIndex((c) => {
      return c.id === id;
    });
    if (this.folders.length <= 1) {
      this.folders[index].cvs = null;
      this.folders[index].nameFolder = 'Default Folder';
    } else {
      if (index !== -1) {
        this.folders.splice(index, 1);
      }
      this._$folders.next(this.folders);
    }
  }

  // CVS METHODS

  /**
   * adds given cv id into array of user checked CVs;
   * @param id
   */
  public addCheckedCv(id: number) {
    this.checkedCvs.push(id);
    this._$checkedFoldersChanged.next(this.checkedCvs);
  }

  /**
   * removes given cv id from array of user checked CVs;
   * @param id
   */
  public removeCheckedCv(id: number) {
    const index = this.checkedCvs.findIndex((c) => {
      return c === id;
    });
    this.checkedCvs.splice(index, 1);
    this._$checkedFoldersChanged.next(this.checkedCvs);
  }

  /**
   * deletes in current folder all CVs whose IDs represented
   * in arrays of CVs, selected by user;
   * TODO api request
   */
  public deleteSelectedCvs() {
    this.checkedCvs.forEach((id: number) => {
      const cvIndex = this.currentFolder.cvs.findIndex((current) => {
        return current.id === id;
      });
      this.currentFolder.cvs.splice(cvIndex, 1);
    });
    this.clearChecks();
  }

  public clearChecks() {
    this.checkedCvs = [];
    this._$checkedFoldersChanged.next(this.checkedCvs);
  }

  //              //
  // API METHODS  \\
  //              //
  private async apiGetFolders() {
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

    let folders = response['data'];
// TESTING
    folders = <ProfileFolder[]> testingFolders;
// TESTING
    console.log(folders);
    this.folders = folders;
    this._$folders.next(folders);
    this.isDownloading = false;
    this.downloadCompleted.emit();
  }

  /**
   * makes request to the server and changes name of folder with
   * given id on given name;
   * @param folder
   */
  async apiEditFolder(folder) {
    try {
      this._auth.handleSession();
    } catch (error) {
      throw error;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    const resp = await this._api
      .put<ProfileFolder>(
        ['api', 'folders', folder.id],
        folder,
        httpOptions)
      .toPromise();
    console.log(resp);
  }
}



















