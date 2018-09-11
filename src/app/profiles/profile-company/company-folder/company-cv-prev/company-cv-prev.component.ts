import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {CompanyFoldersService} from '../../company-folders.service';
import {CV} from '../../../../../models/cv/cv.model';
import {ProfileFolder} from '../../../../../models/profileFolder';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-company-cv-prev',
  templateUrl: './company-cv-prev.component.html',
  styleUrls: ['./company-cv-prev.component.scss']
})
export class CompanyCvPrevComponent implements OnInit, OnDestroy {
  folderSubscription: Subscription;
  checked: boolean;
  checkedCount = 0;
  @Input() cv: CV;

  constructor(
    private _companyService: CompanyFoldersService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onCheckboxPressed(event: Event) {
    const state = event.target['checked'];
    if (state) {
      this._companyService.addCheckedCv(this.cv.id);
    } else {
      this._companyService.removeCheckedCv(this.cv.id);
    }
  }
}
