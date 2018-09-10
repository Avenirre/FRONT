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
  checked: boolean[];
  checkedCount = 0;
  // folder: ProfileFolder;
  @Input() cv: CV;

  constructor(
    private companyService: CompanyFoldersService
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
    // const state = event.target.checked;
    // this.companyService.cvCheckboxPressed(state);
  }
}
