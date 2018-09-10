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
    private companyService: CompanyFoldersService
  ) { }

  ngOnInit() {
    // this.companyService.checkedChanged.subscribe((count: number) => {
    //   this.selectedCount = count;
    // });
  }

}
