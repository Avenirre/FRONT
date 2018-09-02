import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.scss']
})
export class CompanyMenuComponent implements OnInit, OnDestroy {
  foldersNames: string[];
  foldersSubscription: Subscription;

  constructor(
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.foldersNames = this.companyService.getFoldersNames();
  }

  ngOnDestroy(): void {
    this.foldersSubscription.unsubscribe();
  }

  onSelectFolder(index: number): void {
    this.companyService.selectFolder(index);
  }
}
