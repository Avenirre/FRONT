import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../../services/rest/api.service';
import {HttpHeaders} from '../../../../../node_modules/@angular/common/http';
import {DataService} from '../../../../services/data.service';
import {CV} from '../../../../models/cv/cv.model';

@Component({
  selector: 'app-profile-cvs',
  templateUrl: './profile-cvs.component.html',
  styleUrls: ['./profile-cvs.component.scss']
})
export class ProfileCvsComponent implements OnInit {
  cvs: CV[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
      this.apiService.get(environment.api.user_cvs, {headers: headers}).subscribe(
          (res) => {
              this.cvs = res['data'];
              console.log(JSON.stringify(this.cvs));
          }
      );
  }

}
