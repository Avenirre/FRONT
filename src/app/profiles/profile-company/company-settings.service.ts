import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Applicant} from '../../../models/auth/applicant.model';
import {environment} from '../../../environments/environment';
import {DataService} from '../../../services/data.service';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {ApiService} from '../../../services/rest/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService implements OnInit {
  profile: Applicant;
  _profileChanged = new BehaviorSubject<Applicant>(this.profile);
  _downloadCompleted = new EventEmitter();

  constructor(
    private _api: ApiService
  ) {
  }

  async ngOnInit() {
    if (!this.profile) {
      this.profile = await this.getProfile();
      this._profileChanged.next(this.profile);
    }
  }

  async getProfile(): Promise<Applicant> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    const response = await this._api
      .get(['api', 'profiles', DataService.getUserId().toString()],
        httpOptions)
      .toPromise();
    console.log(response);
    return response['data'];
  }

  async updateProfile(profile: Applicant) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataService.getUserToken()}`
      })
    };
    const response = await this._api
      .put<Applicant>(
        ['api', 'profiles', DataService.getUserId().toString()],
        profile,
        httpOptions
      )
      .toPromise();
    console.log(response);
    this.profile = await this.getProfile();
    this._profileChanged.next(this.profile);
  }
}









