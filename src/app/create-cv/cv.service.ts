import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CV} from '../../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  cv: CV = new CV();
  cvChanged = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  setCv(cv) {
      this.cv = cv;
  }

  emitCvChanges() {
      this.cvChanged.emit(this.cv);
  }

  getCv() {
      return this.cv;
  }

  saveCv() {}

}
