import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {DataService} from '../../../../services/data.service';
import {NgForm} from '@angular/forms';
import {ProfileFolder} from '../../../../models/profileFolder';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.scss']
})

export class CompanyMenuComponent implements OnInit, OnDestroy {
  routes = environment.routes;
  SectionUnit = SectionUnit;
  menuSection: SectionUnit;
  states = {
    isCreateFolder: false,
    isEditFolder: false,
  };
  foldersNames: {id: number, name: string}[];
  currentFolderName: string;
  folderSubscription: Subscription;
  namesSubscription: Subscription;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.foldersNames = this.companyService.getFoldersNames();
    this.folderSubscription = this.companyService.folderChanged.subscribe(
      (folder: string) => {
        this.currentFolderName = folder;
      });
    this.namesSubscription = this.companyService.foldersNamesChanged.subscribe(
      (names: {id: number, name: string}[]) => {
        this.foldersNames = names;
      });
    this.onSelectDefaultFolder();
  }

  ngOnDestroy(): void {
    this.folderSubscription.unsubscribe();
    this.namesSubscription.unsubscribe();
  }

  /**
   * Used when initially open folders section;
   * Looks for last used folder in local storage. If there is no information in localStorage
   * opens first folder in folders array;
   * Sets current menu section to FOLDERS;
   */
  onSelectDefaultFolder() {
    this.menuSection = SectionUnit.FOLDERS;
    const localFolder = DataService.getCurrentFolder();
    if (this.companyService.isFolderExists(localFolder)) {
      this.navigateToFolder(localFolder);
    } else {
      this.navigateToFolder(this.foldersNames[0].name);
    }
  }

  onSelectFolder(folder: string): void {
    this.menuSection = SectionUnit.FOLDERS;
    if (folder !== this.currentFolderName) {
      this.companyService.resetCheckedCount();
      this.navigateToFolder(folder);
      DataService.setCurrentFolder(folder);
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

  onCreateFolder(form: NgForm) {
    this.states.isCreateFolder = false;
    this.companyService.createFolder(form['folderName']);
  }

  onEditFolder(id: number, name: string) {
    this.states.isEditFolder = false;
    this.companyService.editFolder(id, name);

  }

  onEditFolderDialog(folder: string) {
    this.states.isEditFolder = true;
  }

  onDeleteFolder(id: number) {
    this.companyService.deleteFolder(id);
  }

  onSelectSettings() {
    this.menuSection = SectionUnit.SETTINGS;
  }

  onSelectSearch() {
    this.menuSection = SectionUnit.SEARCH;
  }

  openCreateFolderDialog() {
    this.states.isCreateFolder = !this.states.isCreateFolder;
  }

}

enum SectionUnit {
  FOLDERS, SEARCH, SETTINGS
}














