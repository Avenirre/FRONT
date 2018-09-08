import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CV} from '../../models/cv/cv.model';
import {ApiService} from '../../services/rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {HeaderControlsService} from '../header/header-controls.service';
import {AuthService} from '../auth/auth.service';
import {Activity} from '../../models/cv/cv.activity.model';
import {environment} from '../../environments/environment';
import {Position} from '../../models/cv/cv.position.model';
import {Template} from '../../models/cv/cv.template.model';
import {Education} from '../../models/cv/cv.education.model';
import {Job} from '../../models/cv/cv.job.model';
import {Achievement} from '../../models/cv/cv.achievement.model';
import {Certification} from '../../models/cv/cv.certification.model';

@Injectable({
  providedIn: 'root'
})
export class CvService implements OnInit {
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DataService.getUserToken()}`
        })
  };
  cv: CV = null;
  user_cvs: CV[];
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

  public setEditCv(id: number): void {
      if (this.user_cvs) {
          for (let i = 0; i < this.user_cvs.length; i++) {
              if (this.user_cvs[i].id == id) {
                  this.cv = this.user_cvs[i];
                  if (!this.cv.positionPreference) {
                      this.cv.positionPreference = new Position(null, null);
                  }
                  if (!this.cv.template) {
                      this.cv.template = new Template(null, 0, 0);
                  }
                  if (this.cv.education.length === 0) {
                      this.cv.education.push(new Education(null, null, null, null, null, null));
                  }
                  this.unCompileActivity();
                  console.log(this.cv);
                  return;
              }
              this.cv =  new CV();
          }
      } else {
          this.cv =  new CV();
      }
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
        this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
        console.log(JSON.stringify(cv));
        this.apiService.post<CV>(this.routes.api.save_cv, cv, {headers: headers})
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
        this.cv.cvJobs = [];
        this.cv.cvAchievements = [];
        this.cv.cvCertification = [];
        for (let i = 0; i < this.cv.cvActivity.length; i++) {
            switch (this.cv.cvActivity[i].activityTypeId) {
                case 1:
                    this.cv.cvJobs.push(new Job(
                        this.cv.cvActivity[i].id,
                        '',
                        this.cv.cvActivity[i].positionId,
                        '',
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearStart,
                        this.cv.cvActivity[i].yearEnd,
                        this.cv.cvActivity[i].backFront));
                    break;
                case 2:
                    this.cv.cvAchievements.push(new Achievement(
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearEnd));
                    break;
                case 3:
                    this.cv.cvCertification.push(new Certification(
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearEnd));
                    break;
            }
        }
    }

  setUsersCvs() {
        const result = new Promise(
            (resolve, reject) => {
                let headers: HttpHeaders = new HttpHeaders();
                headers = headers.append('Content-Type', 'application/json');
                headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
                this.apiService.get(environment.api.user_cvs, {headers: headers}).subscribe(
                    (res) => {
                        this.user_cvs = res['data'];
                        resolve('finish');
                    }
                );
            }
        );
        return result;
    }

  getUsersCvs(): CV[] {
      return this.user_cvs;
    }

  ngOnInit(): void {
    }

}























