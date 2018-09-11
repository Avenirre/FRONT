import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionUnit} from '../../../../../enums/company-folders-action.enum';
import {CompanyFoldersService} from '../../company-folders.service';
import {ProfileFolder} from '../../../../../models/profileFolder';
import {Subscription} from 'rxjs';
import {DataService} from '../../../../../services/data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss']
})
export class FoldersListComponent implements OnInit, OnDestroy {
  foldersSubscription: Subscription;
  currentFolderSubscription: Subscription;
  ActionUnit = ActionUnit;
  menuAction = ActionUnit.NONE;
  folders: ProfileFolder[];
  currentFolder: ProfileFolder;
  errors = {
    ExistFolder: false,
    EmptyNewFolderName: false,
    EmptyFolderName: false
  };

  constructor(
    private _companyService: CompanyFoldersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.foldersSubscription = this._companyService._$folders
      .subscribe((folders) => {
        if (folders) {
          this.folders = folders;
          this._companyService.navigateToDefaultFolder();
        }
      });
    this.currentFolderSubscription = this._companyService._$currentFolder
      .subscribe((currentFolder) => {
        if (currentFolder) {
          this.currentFolder = currentFolder;
        }
      });
  }

  ngOnDestroy(): void {
  }

  onSelectFolder(folder: ProfileFolder): void {
    if (folder !== this.currentFolder) {
      this._companyService.navigateToFolder(folder.id);
      this._companyService.clearChecks();
    }
  }

  onCreateFolder(name: string) {
    this.resetErrors();
    if (name.length === 0) {
      this.errors.EmptyNewFolderName = true;
    }
    if (this._companyService.isFolderExists(name)) {
      this.errors.ExistFolder = true;
    }
    if (!this.isError()) {
      this._companyService.createFolder(name);
      this.menuAction = ActionUnit.NONE;
    }
  }

  openCreateFolderDialog() {
    this.resetErrors();
    if (this.menuAction === ActionUnit.CREATE_FOLDER) {
      this.menuAction = ActionUnit.NONE;
    } else {
      this.menuAction = ActionUnit.CREATE_FOLDER;
    }
  }

  editFolder(folder: ProfileFolder, name) {
    this.resetErrors();
    if (this._companyService.isFolderExists(name)) {
      this.errors.ExistFolder = true;
    } else if (name.length === 0) {
      this.errors.EmptyFolderName = true;
    } else {
      console.log('edit folder', folder);
      const editedFolder = folder.nameFolder = name;
      this._companyService.editFolder(folder.id, name);
      this.menuAction = ActionUnit.NONE;
    }
  }

  openEditFolderDialog() {
    this.resetErrors();
    this.menuAction = ActionUnit.EDIT_FOLDER;
  }

  cancelEdit() {
    this.resetErrors();
    this.menuAction = ActionUnit.NONE;
  }

  deleteFolder(id: number) {
    this._companyService.deleteFolder(id);
  }

  private isError() {
    if (this.errors.ExistFolder || this.errors.EmptyNewFolderName || this.errors.EmptyFolderName) {
      return true;
    }
    return false;
  }

  private resetErrors() {
    this.errors.ExistFolder = false;
    this.errors.EmptyNewFolderName = false;
    this.errors.EmptyFolderName = false;
  }


}












