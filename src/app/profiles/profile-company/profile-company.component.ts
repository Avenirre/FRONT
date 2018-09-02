import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyFolder} from '../../../models/company.folder';
import {Subscription} from 'rxjs';
import {CompanyService} from './company.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit, OnDestroy {
  folderSubscription: Subscription;
  folder: CompanyFolder;


  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.folder = this.companyService.getCurentFolder();
  }

  ngOnDestroy(): void {
  }
}
