import {AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChild} from '@angular/core';
import {CvService} from '../../../services/cv.service';
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

import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {NgForm, NgModel} from '@angular/forms';
import {forEach} from '../../../../node_modules/@angular/router/src/utils/collection';
import {RenderService} from '../../../services/render.service';


declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  skills = [];
  jobsFrontEnd: boolean[] = [];
  selectedSkills = [];
  languages = [];
  positions = [
      new Position(1, 'Programmer'),
      new Position(2, 'Tester'),
      new Position(3, 'Full Stack Developer'),
      new Position(4, 'Back End Developer'),
      new Position(4, 'Front End Developer'),
  ];
  @ViewChild('searchResidence') public searchCity: ElementRef;
  // @ViewChild('searchEst') public searchEst: ElementRef;
  @ViewChild('f') public form: NgForm;
  @ViewChild('lgDiv') public lgDiv: ElementRef;

  constructor(private cvService: CvService,
              private apiService: ApiService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private elem: ElementRef,
              private renderService: RenderService) {
  }

  ngOnInit() {
      this.cv = this.cvService.setCV();
      this.cvService.setFormToServ(this.form);
      this.renderService.removedSkill.subscribe(
          (skill) => {
              this.skills.push(skill);
          }
      )
      this.apiService.get(environment.api.lang_ref)
        .subscribe(
            (res) => {
                for (let i = 0; i < res['data'].length; i++) {
                    this.languages.push(new Language(+res['data'][i].id, res['data'][i].nameLang));
                }
                for (let i = 0; i < this.cv.languages.length; i++) {
                    for (let ii = 0; ii < this.languages.length; ii++) {
                        if (this.languages[ii].id === this.cv.languages[i].id) {
                            this.languages[ii].available = false;
                        }
                    }
                }
                console.log(this.languages);
            }
        );
      this.apiService.get(environment.api.skills_ref)
          .subscribe(
              (res) => {
                  for (let i = 0; i < res['data'].length; i++) {
                      this.skills.push(new Skill(+res['data'][i].id, res['data'][i].nameSkill));
                  }
                  this.removeSelectedSkills();
              }
          );
      this.mapsAPILoader.load().then(
          () => {
              const autocompleteCity = new google.maps.places.Autocomplete(this.searchCity.nativeElement, { types: ['(cities)'] });
              autocompleteCity.addListener('place_changed', () => {
                  this.ngZone.run(() => {
                      const place: google.maps.places.PlaceResult = autocompleteCity.getPlace();
                      if (place.geometry === undefined || place.geometry === null ) {
                          return;
                      }
                      this.cv.residence = place.formatted_address;
                  });
              });
          }
      );
  }

  addEducation() {
    this.cv.education.push(new Education(null, '', null, '', ''));
  }

  removeEducation() {
     this.cv.education.splice(this.cv.education.length - 1, 1);
  }

  addJob() {
    this.cv.cvJobs.push(new Job(null, '', '', '', null, null, null));
  }

  removeJob() {
      this.cv.cvJobs.splice(this.cv.cvJobs.length - 1, 1);
  }

  addAchivement() {
    this.cv.cvAchievements.push(new Achievement('', null, null));
  }

  removeAchivement() {
    this.cv.cvAchievements.splice(this.cv.cvAchievements.length - 1, 1);
  }

  addCertification() {
    this.cv.cvCertification.push(new Certification('', null, null));
  }

  removeCertification() {
    this.cv.cvCertification.splice(this.cv.cvCertification.length - 1, 1);
  }

  addLanguage() {
    this.cv.languages.push(new Language(null, ''));
  }

  removeLanguage() {
    this.cv.languages.splice(this.cv.languages.length - 1, 1);
    this.refreshAbleLg();
  }

  setData() {
    this.cvService.setCV(this.cv);
    this.cvService.setFormToServ(this.form);
    this.cvService.emitCvChanges();
    console.log(this.form);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  compareFn(c1, c2): boolean {
     return c1 && c2 ? c1.id == c2.id : c1 == c2;
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }

  setMarkPresentation(event) {
      const name  = (event.srcElement.name !== '' && event.srcElement.name) ?
          event.srcElement.name : event.srcElement.getAttribute('ng-reflect-name');
      this.cvService.setLightFieldPresentation(name);
  }

  clearMarkPresentation(event) {
      this.cvService.setLightFieldPresentation(null);
  }

  refreshAbleLg() {
      for (let i = 0; i < this.cv.languages.length; i++) {
          for (let ii = 0; ii < this.languages.length; ii++) {
              if (this.cv.languages[i].id === this.languages[ii].id) {
                  this.cv.languages[i].nameLang = this.languages[ii].nameLang;
              }
          }
      }
      const notAvaiables: number[] = [];
      for (let i = 0; i < this.lgDiv.nativeElement.children.length; i++) {
          const lgId = this.form.controls['language_' + i].value;
          notAvaiables.push(lgId);
      }
      for (let i = 0; i < this.languages.length; i++) {
          this.languages[i].available = true;
          for (let ii = 0; ii < notAvaiables.length; ii++) {
              if (this.languages[i].id === notAvaiables[ii]) {
                  this.languages[i].available = false;
                  break;
              }
          }
      }
      console.log('CV lg: ', this.cv.languages);
  }

  isLangHidden(lgId) {
      for (let i = 0; i < this.languages.length; i++) {
          if (this.languages[i].id === lgId) {
              return !this.languages[i].available;
          }
      }
      return false;
  }

  addSkill(skill: Skill) {
    this.cv.skills.push(skill);
    for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i].id === skill.id) {
            this.skills.splice(i, 1);
        }
    }
  }

  removeSelectedSkills() {
      for (let i = 0; i < this.cv.skills.length; i++) {
          for (let ii = 0; ii < this.skills.length; ii++) {
              if (this.skills[ii].id === this.cv.skills[i].id) {
                  console.log('match');
                  this.skills.splice(ii, 1);
              }
          }
      }
  }

  isRenderedRange(i) {
      const position = this.cv.cvJobs[i].position;
      const reg = position.match(/n*(full stack)|(fullstack)n*/i);
      const res = reg ? true : false;
      this.jobsFrontEnd[i] = res;
      this.renderService.jobsFrontEndChange.next({id: i, value: res});
  }
}
