import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CV} from '../../models/cv.model';
import {ApiService} from '../../services/rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {HeaderControlsService} from '../header/header-controls.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DataService.getUserToken()}`,
    })
  };
  cv: CV = null;
  cvChanged = new EventEmitter<any>();
  expectingCv = false;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private headerService: HeaderControlsService,
              private authService: AuthService) {
  }

  public getCV() {
    if (this.cv === null) {
      this.cv = DataService.getCV();
      if (this.cv === null) {
        this.cv = new CV();
      }
    }
    return this.cv;
  }

  public setCV(cv) {
    this.cv = cv;
  }

  public setTemplate(template: { templateType: number, templateColor: number }): void {
    this.cv.template.type = template.templateType;
    this.cv.template.color_scheme = template.templateColor;
    this.emitCvChanges();
  }

  public emitCvChanges() {
    DataService.saveCV(this.cv);
    this.cvChanged.emit(this.cv);
  }

  public saveCV(cv: CV) {
    if (!this.authService.isLoggedIn()) {
      this.expectingCv = true;
      this.headerService.openModal('login');
    } else {
      // this.apiService.post<CV>(['cs/set'], cv, this.httpOptions)
      //   .subscribe(
      //     (data) => {
      //       console.log(data);
      //     });
        this.expectingCv = false;
    }
  }
}























