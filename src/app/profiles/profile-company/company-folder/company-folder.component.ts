import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CompanyService} from '../company.service';
import {ProfileFolder} from '../../../../models/profileFolder';

@Component({
  selector: 'app-company-folder',
  templateUrl: './company-folder.component.html',
  styleUrls: ['./company-folder.component.scss']
})
export class CompanyFolderComponent implements OnInit {
  folder: ProfileFolder;
  errors = {
    FolderNotFound: false
  };

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const folderName = params['folder'];
      if (this.companyService.isFolderExists(folderName)) {
        this.companyService.setCurrentFolder(folderName);
        this.folder = this.companyService.getFolder(folderName);
        this.errors.FolderNotFound = false;
        console.log(this.folder);
      } else {
        this.errors.FolderNotFound = true;
      }
    });
  }
}
