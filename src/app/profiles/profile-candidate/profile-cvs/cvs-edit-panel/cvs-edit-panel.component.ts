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
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.routes = environment.routes;
  }

  deleteCheckedCvs() {
    for (let i = 0; i < this.cvService.userCvsIdChecked.length; i++) {
      this.cvService.deleteCv(this.cvService.userCvsIdChecked[i]);
    }
  }

}
