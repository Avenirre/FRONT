import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../../services/rest/api.service';
import {HttpHeaders} from '../../../../../node_modules/@angular/common/http';
import {DataService} from '../../../../services/data.service';
import {CV} from '../../../../models/cv/cv.model';
import {CvService} from '../../../../services/cv.service';

@Component({
  selector: 'app-profile-cvs',
  templateUrl: './profile-cvs.component.html',
  styleUrls: ['./profile-cvs.component.scss']
})
export class ProfileCvsComponent implements OnInit {
  cvs: CV[];
  constructor(private cvService: CvService) { }

  ngOnInit() {
      this.cvs = this.cvService.getUsersCvs();
      this.cvService.changedUserCVs.subscribe(
          (CVs) => {
              this.cvs = CVs;
              this.cvService.userCvsIdChecked = [];
              this.cvService.changedChecked.next(this.cvService.userCvsIdChecked.length);
          }
      );
      if (!this.cvs) {
          document.body.style.cursor = 'progress';
          this.cvService.setUsersCvs().then(
              (res) => {
                this.cvs = this.cvService.getUsersCvs();
              }
          );
      }
  }

}
