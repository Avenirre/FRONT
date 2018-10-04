import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CV} from '../models/cv/cv.model';
import {ApiService} from './rest/api.service';
import {HttpHeaders} from '@angular/common/http';
import {DataService} from './data.service';
import {HeaderControlsService} from '../app/header/header-controls.service';
import {AuthService} from '../app/auth/auth.service';
import {Activity} from '../models/cv/cv.activity.model';
import {environment} from '../environments/environment';
import {Position} from '../models/cv/cv.position.model';
import {Template} from '../models/cv/cv.template.model';
import {Education} from '../models/cv/cv.education.model';
import {Job} from '../models/cv/cv.job.model';
import {Achievement} from '../models/cv/cv.achievement.model';
import {Certification} from '../models/cv/cv.certification.model';
import {Language} from '../models/cv/cv.lang.model';
import {Skill} from '../models/cv/cv.skill.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';

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
  userCvsIdChecked: number[] = [];
  lightPresentationField = new EventEmitter<string>();
  cvChanged = new EventEmitter<any>();
  expectingCv = false;
  routes = environment;
  changedChecked = new Subject<number>();
  changedUserCVs = new Subject<CV[]>();
  changedUserCvsLocal = new EventEmitter<CV[]>()
  changedForm = new Subject<NgForm>();
  onlyShowMode = true;
  form: NgForm;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private headerService: HeaderControlsService,
              private authService: AuthService,
              private router: Router) {
  }

  public setCV(cv?) {
      if (typeof cv === 'number') {
          const get_route = [];
          for (let i = 0; i < this.routes.api.user_cvs.length; i++) {
              get_route.push(this.routes.api.user_cvs[i]);
          }
          get_route.push(cv.toString());
          let headers: HttpHeaders = new HttpHeaders();
          headers = headers.append('Content-Type', 'application/json');
          headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
          this.apiService.get(get_route, {headers: headers}).subscribe(
              (res) => {
                  this.cv = res['data'];
                  this.prepareToUsing();
                  this.onlyShowMode = true;
                  this.cvChanged.next(this.cv);
                  return this.cv;
              },
              (error) => {
                  return error;
              }
          );
      } else {
        if (cv) {
            this.cv = cv;
            this.changedForm.next(this.form);
        } else {
            if (this.cv === null) {
              this.cv = DataService.getCV();
              if (this.cv === null) {
                this.cv = new CV();
              }
            }
        }
        this.onlyShowMode = false;
        this.cvChanged.next(this.cv);
        return this.cv;
      }
  }

  public deleteCv(id) {
          for (let i = 0; i < this.user_cvs.length; i++) {
              if (this.user_cvs[i].id === id) {
                  this.user_cvs.splice(i, 1);
                  const delete_path = [];
                  for (let ii = 0; ii < environment.api.delete_cv.length; ii++) {
                      delete_path.push(environment.api.delete_cv[ii]);
                  }
                  delete_path.push(id);
                  let headers: HttpHeaders = new HttpHeaders();
                  headers = headers.append('Content-Type', 'application/json');
                  headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
                  document.body.style.cursor = 'progress';
                  this.apiService.delete(delete_path, {headers: headers}).subscribe(
                      (result) => {
                          document.body.style.cursor = 'auto';
                          console.log(result);
                      },
                     (error) => {
                          document.body.style.cursor = 'auto';
                          console.log(error);
                      });
              }
          }
  }

  public toggleActiveCV(id: number, status: boolean) {
    for (let i = 0; i < this.user_cvs.length; i++) {
        if (this.user_cvs[i].id === id) {
            this.cv = this.user_cvs[i];
            this.cv.activated = status;
            let headers: HttpHeaders = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
            const update_path = [];
            for (let ii = 0; ii < environment.api.delete_cv.length; ii++) {
                update_path.push(environment.api.delete_cv[ii]);
            }
            update_path.push(id);
            this.apiService.put<CV>(update_path, this.cv, {headers: headers})
                .subscribe(
                    (data) => {
                        console.log(data);
                        // this.setUsersCvs();
                    });
        }
    }
  }

  public setCVOfUserCvs(id: number): void {
      if (this.user_cvs) {
          for (let i = 0; i < this.user_cvs.length; i++) {
              if (this.user_cvs[i].id == id) {
                  this.cv = this.user_cvs[i];
                  this.prepareToUsing();
                  console.log('selected CV: ', this.cv);
                  return;
              }
              //  this.cv =  new CV();
          }
          this.router.navigate([environment.routes.cvCreate]);
      } else {
          this.router.navigate([environment.routes.cvCreate]);
          // this.cv =  new CV();
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

  public saveCV() {
    if (!this.form.valid) {
        console.log('invalid form', this.form);
        return;
    }
    if (!AuthService.isLoggedIn()) {
      this.expectingCv = true;
      this.headerService.openModal('login');
    } else {
        this.prepareCvToSave();
        this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', `Bearer ${DataService.getUserToken()}`);
        if (this.cv.id) {
            const update_path = [];
            for (let ii = 0; ii < environment.api.delete_cv.length; ii++) {
                update_path.push(environment.api.delete_cv[ii]);
            }
            update_path.push(this.cv.id);
            this.apiService.put<CV>(update_path, this.cv, {headers: headers})
                .subscribe(
                    (data) => {
                        console.log(data);
                        this.setUsersCvs();
                    });
        } else {
            this.apiService.post<CV>(this.routes.api.save_cv, this.cv, {headers: headers})
             .subscribe(
               (data) => {
                 console.log(data);
                 this.setUsersCvs();
               });
        }
        this.expectingCv = false;
        this.router.navigate(['/profile/candidate']);
    }
  }

  public prepareCvToSave() {
      this.prepareActivity();
      this.prepareLangs();
      this.prepareSkills();
  }

  private prepareActivity() {
        this.cv.cvActivity = [];
        for (let i = 0; i < this.cv.cvJobs.length; i++) {
            this.cv.cvActivity.push(
                new Activity(this.cv.cvJobs[i].id,
                    1,
                    null,
                    this.cv.cvJobs[i].company,
                    this.cv.cvJobs[i].position,
                    this.cv.cvJobs[i].description,
                    this.cv.cvJobs[i].yearStart,
                    this.cv.cvJobs[i].yearEnd,
                    this.cv.cvJobs[i].backFront)
            );
        }
        for (let i = 0; i < this.cv.cvAchievements.length; i++) {
            this.cv.cvActivity.push(
                new Activity(this.cv.cvAchievements[i].id,
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
                new Activity(this.cv.cvCertification[i].id,
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

  private prepareLangs() {
      for (let i = 0; i < this.cv.languages.length; i++) {
          if (this.cv.languages[i].id == null || this.cv.languages[i].id === '') {
              this.cv.languages.splice(i, 1);
          }
      }
  }

  private prepareSkills() {
      for (let i = 0; i < this.cv.skills.length; i++) {
          if (this.cv.skills[i].id == null || this.cv.skills[i].id === '') {
              this.cv.skills.splice(i, 1);
          }
      }
  }

  public prepareToUsing() {
        this.cv.cvJobs = [];
        this.cv.cvAchievements = [];
        this.cv.cvCertification = [];
        for (let i = 0; i < this.cv.cvActivity.length; i++) {
            switch (this.cv.cvActivity[i].activityTypeId) {
                case 1:
                    this.cv.cvJobs.push(new Job(
                        this.cv.cvActivity[i].id,
                        this.cv.cvActivity[i].company,
                        this.cv.cvActivity[i].position,
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearStart,
                        this.cv.cvActivity[i].yearEnd,
                        this.cv.cvActivity[i].backFront));
                    break;
                case 2:
                    this.cv.cvAchievements.push(new Achievement(
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearEnd,
                        this.cv.cvActivity[i].id));
                    break;
                case 3:
                    this.cv.cvCertification.push(new Certification(
                        this.cv.cvActivity[i].description,
                        this.cv.cvActivity[i].yearEnd,
                        this.cv.cvActivity[i].id));
                    break;
            }
        }
      for (let i = 0; i < this.cv.languages.length; i++) {
          this.cv.languages[i] = new Language(this.cv.languages[i].id, this.cv.languages[i].nameLang);
      }
      if (!this.cv.template) {
          this.cv.template = new Template(null, 0, 0);
      }
      if (this.cv.cvJobs.length === 0 && this.cv.id === null) {
          this.cv.cvJobs.push(new Job(null, '', '', '', null, null, 50));
      }
      if (this.cv.cvCertification.length === 0 && this.cv.id === null) {
          this.cv.cvCertification.push(new Certification('', null, null));
      }
      if (this.cv.cvAchievements.length === 0 && this.cv.id === null) {
          this.cv.cvAchievements.push(new Achievement('', null, null));
      }
      if (this.cv.education.length === 0 && this.cv.id === null) {
          this.cv.education.push(new Education(null, null, null, null, null));
      }
      if (this.cv.languages.length === 0 && this.cv.id === null) {
          this.cv.languages.push(new Language(null, null));
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
                        this.changedUserCVs.next(this.user_cvs);
                        document.body.style.cursor = 'auto';
                        console.log(res);
                        resolve(res);
                    },
                    (error) => {
                        document.body.style.cursor = 'auto';
                        console.log(error);
                        reject(error);
                    }
                );
            }
        );
        return result;
  }

  getUsersCvs(): CV[] {
      return this.user_cvs;
  }

  setFormToServ(form: NgForm) {
      this.form = form;
      this.changedForm.next(form);
  }

  setLightFieldPresentation(fieldName: string) {
      this.lightPresentationField.next(fieldName);
  }

  ngOnInit(): void {
  }

}























