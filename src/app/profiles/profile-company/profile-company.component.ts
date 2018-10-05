import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyFoldersService} from './company-folders.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SectionUnit} from '../../../enums/section.enum';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {CompanySettingsService} from './company-settings.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss'],
  providers: [
    CompanyFoldersService,
    CompanySettingsService
  ]
})
export class ProfileCompanyComponent implements OnInit, OnDestroy {
  sectionSubscription: Subscription;
  routeSubscription: Subscription;
  SectionUnit = SectionUnit;
  section: SectionUnit;


  constructor(
    private _companyFoldersService: CompanyFoldersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
          this._companyFoldersService.sectionChanged(params['section']);
        }
      );
    this.sectionSubscription = this._companyFoldersService._$section
      .subscribe((section) => {
        this.section = section;
      });
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }


}
