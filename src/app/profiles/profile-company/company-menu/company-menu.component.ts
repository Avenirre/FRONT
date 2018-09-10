import {Component, OnDestroy, OnInit} from '@angular/core';
import {SectionUnit} from '../../../../enums/section.enum';
import {DataService} from '../../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {CompanyFoldersService} from '../company-folders.service';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.scss']
})

export class CompanyMenuComponent implements OnInit, OnDestroy {
  SectionUnit = SectionUnit;
  section = SectionUnit.FOLDERS;

  constructor(
    private _companyFolderService: CompanyFoldersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this._companyFolderService._$section.subscribe((section) => {
      this.section = section;
      // if (section === SectionUnit.FOLDERS) {
      //   this._companyFolderService.getBackEndFolders();
      // }
    });
  }

  /**
   * opens SEARCH section of menu and redirects inner router outlet to search component;
   */
  openSearchSection() {
    this.section = SectionUnit.SEARCH;
    // DataService.setMenuSection(this.section);
    this.router.navigate(['../', environment.routes.profileCompanySearch],
      {relativeTo: this.activatedRoute});
  }

  /**
   * opens SETTINGS section of menu and redirects inner router outlet to settings component;
   */
  openSettingsSection() {
    this.section = SectionUnit.SETTINGS;
    this.router.navigate(['../', environment.routes.profileCompanySettings],
      {relativeTo: this.activatedRoute});
  }

  /**
   * opens FOLDERS section of menu and redirects inner router outlet to folder component;
   */
  openFoldersSection() {
    this.section = SectionUnit.FOLDERS;
    this._companyFolderService.navigateToDefaultFolder();
    // this.router.navigate(['../', environment.routes.profileCompanyFolders],
    //   {relativeTo: this.activatedRoute});
  }
}

















