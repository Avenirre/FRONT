import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../../services/rest/api.service';
import {HttpHeaders} from '../../../../../node_modules/@angular/common/http';
import {DataService} from '../../../../services/data.service';
import {CV} from '../../../../models/cv/cv.model';
import {CvService} from '../../../create-cv/cv.service';

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
      if (!this.cvs) {
          this.cvService.setUsersCvs().then(
              (res) => {
                this.cvs = this.cvService.getUsersCvs();
              }
          );
      }
  }

}
