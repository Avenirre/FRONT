import {Component, OnInit} from '@angular/core';
import {CvService} from '../cv.service';
import {CV} from '../../../models/cv/cv.model';
import {DataService} from '../../../services/data.service';
import {Education} from '../../../models/cv/cv.education.model';
import {Job} from '../../../models/cv/cv.job.model';
import {Achievement} from '../../../models/cv/cv.achievement.model';
import {Certification} from '../../../models/cv/cv.certification.model';
import {Language} from '../../../models/cv/cv.lang.model';
import {Skill} from '../../../models/cv/cv.skill.model';
import {Position} from '../../../models/cv/cv.position.model';
import {ApiService} from '../../../services/rest/api.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  skills = [];
  languages = [];
  positions = [
      new Position(1, 'Programmer'),
      new Position(2, 'Tester'),
      new Position(3, 'Full Stack Developer'),
      new Position(4, 'Back End Developer'),
      new Position(4, 'Front End Developer'),
  ];

  constructor(private cvService: CvService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.cv = this.cvService.getCV();
      this.apiService.get(environment.api.skills_ref)
        .subscribe(
            (res) => {
                for (let i = 0; i < res['data'].length; i++) {
                    this.languages.push(new Language(+res['data'][i].id, res['data'][i].nameSkill));
                }
            }
        );
      this.apiService.get(environment.api.lang_ref)
          .subscribe(
              (res) => {
                  for (let i = 0; i < res['data'].length; i++) {
                      this.skills.push(new Skill(+res['data'][i].id, res['data'][i].nameLang));
                  }
              }
          );
  }

  // getLangRef() {
  //     const url = this.apiService.buildRequest(environment.api.lang_ref);
  //     return this.http.get(url);
  // }
  //
  // getSkillsRef() {
  //     const url = this.apiService.buildRequest(environment.api.skills_ref);
  //     return this.http.get(url);
  // }

  addEducation() {
    this.cv.education.push(new Education(null, '', null, '', '', ''));
  }

  addJob() {
    this.cv.cvJobs.push(new Job(null, '', null, '', '', null, null, null));
  }

  addAchivement() {
    this.cv.cvAchievements.push(new Achievement('', null));
  }

  addCertification() {
    this.cv.cvCertification.push(new Certification('', null));
  }

  addLanguage() {
    this.cv.languages.push(new Language(null, ''));
  }

  setData() {
    this.cvService.setCV(this.cv);
    this.cvService.emitCvChanges();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }
}
