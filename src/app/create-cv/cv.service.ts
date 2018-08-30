import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CV} from '../../models/cv.model';
import {Observable} from 'rxjs';
import {Candidate} from '../../services/support/candidate.service';
import {ApiService} from '../../services/rest/api.service';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
      })
  };
  cv: CV = new CV();
  cvChanged = new EventEmitter<any>();
  constructor(private http: HttpClient, private  apiService: ApiService) { }

  setCv(cv) {
      this.cv = cv;
  }

  emitCvChanges() {
      this.cvChanged.emit(this.cv);
  }

  getCv() {
      return this.cv;
  }

  public saveCV(cv: CV) {
     this.apiService.post<CV>(['cs/set'], cv, this.httpOptions)
        .subscribe(
           (data) => {
              console.log(data);
           });
  }

}
