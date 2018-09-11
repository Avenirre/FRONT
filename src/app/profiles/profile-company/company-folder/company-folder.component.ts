import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from '@angular/router';
import {CompanyFoldersService} from '../company-folders.service';
import {ProfileFolder} from '../../../../models/profileFolder';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-company-folder',
  templateUrl: './company-folder.component.html',
  styleUrls: ['./company-folder.component.scss']
})
export class CompanyFolderComponent implements OnInit {
  folderId: number;
  folder: ProfileFolder;

  errors = {
    FolderNotFound: false,
    FolderIsEmpty: false
  };

  constructor(
    private _companyService: CompanyFoldersService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.folderId = parseInt(params['id'], 10);
      this.getFolder();
    });
    this._companyService._$currentFolder.subscribe((folder) => {
      if (folder !== undefined) {
        this.folder = folder;
      }
    });
  }

  getFolder(): void {
    if (!this._companyService.isDownloading) {
      this._companyService.setCurrentFolderById(this.folderId);
    } else {
      this._companyService.downloadCompleted.subscribe(() => {
        this._companyService.setCurrentFolderById(this.folderId);
      });
    }
  }
}
