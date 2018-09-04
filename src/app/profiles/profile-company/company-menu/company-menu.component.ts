import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.scss']
})
export class CompanyMenuComponent implements OnInit, OnDestroy {
  routes = environment.routes;
  isFolders: boolean;
  foldersNames: string[];
  currentFolderName: string;
  folderSubscription: Subscription;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.foldersNames = this.companyService.getFoldersNames();
    this.folderSubscription = this.companyService.folderChanged.subscribe(
      (folder: string) => {
        this.currentFolderName = folder;
      });
    this.onSelectFolder();
  }

  ngOnDestroy(): void {
    this.folderSubscription.unsubscribe();
  }

  onSelectFolder(folder?: string): void {
    this.isFolders = true;
    if (folder) {
      this.navigateToFolder(folder);
      DataService.setCurrentFolder(folder);
    } else {
      const localFolder = DataService.getCurrentFolder();
      if (localFolder) {
        this.navigateToFolder(localFolder);
      } else {

        this.navigateToFolder(this.foldersNames[0]);
      }
    }
  }

  private navigateToFolder(folder) {
    this.router.navigate(
      [
        this.routes.profileCompanyFolders,
        folder
      ],
      {relativeTo: this.activatedRoute});
  }

  onEditFolder() {

  }

  onDeleteFolder() {

  }

  onSelectSettings() {
    this.router.navigate(['settings'], {relativeTo: this.activatedRoute});
    this.isFolders = false;
  }
}
















