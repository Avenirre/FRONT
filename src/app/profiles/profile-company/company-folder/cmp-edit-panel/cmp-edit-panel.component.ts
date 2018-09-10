import { Component, OnInit } from '@angular/core';
import {CompanyFoldersService} from '../../company-folders.service';

@Component({
  selector: 'app-cmp-edit-panel',
  templateUrl: './cmp-edit-panel.component.html',
  styleUrls: ['./cmp-edit-panel.component.scss']
})
export class CmpEditPanelComponent implements OnInit {
  selectedCount = 0;

  constructor(
    private _companyService: CompanyFoldersService
  ) { }

  ngOnInit() {
    this._companyService._$checkedFoldersChanged.subscribe((checkedFolders) => {
      this.selectedCount = checkedFolders.length;
      console.log(checkedFolders);
    });
  }

  deleteSelectedCvs() {
    this._companyService.deleteSelectedCvs();
  }
}
