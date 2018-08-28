import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  cv = {
      first_name: '',
      second_name: '',
      position: [],
      experience_year: [],
      residence: '',
      birthday: '',
      phone: '',
      email: '',
      linkedin: '',
      description: '',
      prefer_area: '',
      prefer_position: '',
      salary_from: 0,
      salary_till: 0,
      school_name: '',
      degree: '',
      graduation_year: 0,
      school_location: '',
      school_description: '',
      skills: []
  }
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

  saveCv() {
      http.
  }

}
