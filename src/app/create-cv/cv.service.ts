import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CV} from '../../models/cv/cv.model';
import {ApiService} from '../../services/rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {HeaderControlsService} from '../header/header-controls.service';
import {AuthService} from '../auth/auth.service';
import {Activity} from '../../models/cv/cv.activity.model';
import {environment} from '../../environments/environment';

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
  routes = environment;

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
    this.cv.template.colorScheme = template.templateColor;
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
        this.compileActivity(cv);
        console.log(JSON.stringify(this.httpOptions));
        console.log(JSON.stringify(cv));
        this.apiService.post<CV>(this.routes.api.save_cv, cv, this.httpOptions)
         .subscribe(
           (data) => {
             console.log(data);
           });
        this.expectingCv = false;
    }
  }

    public compileActivity(cv) {
        this.cv.cvActivity.splice(0, this.cv.cvActivity.length - 1);
        for (let i = 0; i < this.cv.cvJobs.length; i++) {
            this.cv.cvActivity.push(
                new Activity(null,
                    1,
                    null,
                    this.cv.cvJobs[i].position.id,
                    this.cv.cvJobs[i].position.postName,
                    this.cv.cvJobs[i].description,
                    this.cv.cvJobs[i].yearStart,
                    this.cv.cvJobs[i].yearEnd,
                    this.cv.cvJobs[i].backFront)
            );
        }
        for (let i = 0; i < this.cv.cvAchievements.length; i++) {
            this.cv.cvActivity.push(
                new Activity(null,
                    2,
                    null,
                    null,
                    null,
                    this.cv.cvAchievements[i].description,
                    null,
                    this.cv.cvAchievements[i].yearEnd,
                    null)
            );
        }
        for (let i = 0; i < this.cv.cvCertification.length; i++) {
            this.cv.cvActivity.push(
                new Activity(null,
                    3,
                    null,
                    null,
                    null,
                    this.cv.cvCertification[i].description,
                    null,
                    this.cv.cvCertification[i].yearEnd,
                    null)
            );
        }
    }

    public unCompileActivity() {

    }
}























