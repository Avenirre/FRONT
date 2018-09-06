import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../company.service';

@Component({
  selector: 'app-cmp-edit-panel',
  templateUrl: './cmp-edit-panel.component.html',
  styleUrls: ['./cmp-edit-panel.component.scss']
})
export class CmpEditPanelComponent implements OnInit {
  selectedCount = 0;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyService.checkedChanged.subscribe((count: number) => {
      this.selectedCount = count;
    });
  }

}
