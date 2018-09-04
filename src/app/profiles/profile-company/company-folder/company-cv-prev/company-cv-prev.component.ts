import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../../company.service';
import {CV} from '../../../../../models/cv/cv.model';

@Component({
  selector: 'app-company-cv-prev',
  templateUrl: './company-cv-prev.component.html',
  styleUrls: ['./company-cv-prev.component.scss']
})
export class CompanyCvPrevComponent implements OnInit, OnDestroy {
  // folderSubscription: Subscription;
  // checked: boolean[];
  // checkedCount = 0;
  // folder: ProfileFolder;
  @Input() cv: CV;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    // this.folder = this.companyService.getCurentFolder();
    // this.folderSubscription = this.companyService.folderSelected.subscribe(
    //   (folder: ProfileFolder) => {
    //     this.folder = folder;
    // });
  }

  ngOnDestroy(): void {
    // this.folderSubscription.unsubscribe();
  }

  onCheckboxPressed(event) {
    const state = event.target.checked;
    this.companyService.cvCheckboxPressed(state);
  }
}
