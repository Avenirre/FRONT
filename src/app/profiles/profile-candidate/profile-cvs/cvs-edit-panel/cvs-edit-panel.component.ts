import { Component, OnInit } from '@angular/core';
import {CvService} from '../../../../../services/cv.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-cvs-edit-panel',
  templateUrl: './cvs-edit-panel.component.html',
  styleUrls: ['./cvs-edit-panel.component.scss']
})
export class CvsEditPanelComponent implements OnInit {
  public routes;
  public amount = 0;
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.routes = environment.routes;
    this.cvService.changedChecked.subscribe(
        (amount) => {
          this.amount = amount;
        }
    );
  }

  deleteCheckedCvs() {
      for (let i = 0; i < this.cvService.userCvsIdChecked.length; i++) {
          this.cvService.deleteCv(this.cvService.userCvsIdChecked[i]);
      }
      this.cvService.userCvsIdChecked = [];
      this.cvService.changedChecked.next(this.cvService.userCvsIdChecked.length);
  }

  toggleActiveCVs(active: boolean) {
      for (let i = 0; i < this.cvService.userCvsIdChecked.length; i++) {
          this.cvService.toggleActiveCV(this.cvService.userCvsIdChecked[i], active);
      }
  }
}
