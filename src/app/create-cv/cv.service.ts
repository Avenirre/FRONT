import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CV} from '../../models/cv.model';
import {ApiService} from '../../services/rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../services/data.service';

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

  constructor(private http: HttpClient, private  apiService: ApiService) {
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

  public convertCv(cv: CV) {
    let backCv = cv;
    return backCv;
  }

  public unConvertCv(backCv) {
    let cv = backCv;
    return cv;
  }

  public setCV(cv) {
    this.cv = cv;
  }

  public setTemplate(template: { templateType: number, templateColor: number }): void {
    this.cv.settings.template.type = template.templateType;
    this.cv.settings.template.colorScheme = template.templateColor;
    this.emitCvChanges();
  }

  public emitCvChanges() {
    DataService.saveCV(this.cv);
    this.cvChanged.emit(this.cv);
  }

  public saveCV(cv: CV) {
    this.apiService.post<CV>(['cs/set'], cv, this.httpOptions)
      .subscribe(
        (data) => {
          console.log(data);
        });
  }
}























