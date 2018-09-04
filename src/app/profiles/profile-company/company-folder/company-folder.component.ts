import { Component, OnInit } from '@angular/core';
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

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyService.setCurrentFolder(params['folder']);
      this.folder = this.companyService.getFolder(params['folder']);
      console.log(this.folder.cvs);
    });
  }


}
