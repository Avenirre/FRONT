import {Component, ElementRef, NgZone, OnInit, QueryList, ViewChild} from '@angular/core';
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


declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  skills = [];
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
  @ViewChild('searchEst') public searchEst: ElementRef;

  constructor(private cvService: CvService,
              private apiService: ApiService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
      this.cv = this.cvService.setCV();
      this.apiService.get(environment.api.lang_ref)
        .subscribe(
            (res) => {
                for (let i = 0; i < res['data'].length; i++) {
                    this.languages.push(new Language(+res['data'][i].id, res['data'][i].nameLang));
                }
            }
        );
      this.apiService.get(environment.api.skills_ref)
          .subscribe(
              (res) => {
                  for (let i = 0; i < res['data'].length; i++) {
                      this.skills.push(new Skill(+res['data'][i].id, res['data'][i].nameSkill));
                  }
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

      this.mapsAPILoader.load().then(
          () => {
              const autocompleteEst = new google.maps.places.Autocomplete(this.searchEst.nativeElement, { types: ['establishment'] });

              autocompleteEst.addListener('place_changed', () => {
                  this.ngZone.run(() => {
                      const place: google.maps.places.PlaceResult = autocompleteEst.getPlace();
                      if (place.geometry === undefined || place.geometry === null ) {
                          return;
                      }
                      // this.cv.education[].institution = place.formatted_address;
                  });
              });
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



  // addExperience() {
  //   this.cv['prof_info']['experience'].push(new Experience(''));

  // }

  addEducation() {
    this.cv.education.push(new Education(null, '', null, '', ''));
  }

  addJob() {
    this.cv.cvJobs.push(new Job(null, '', '', '', null, null, null));
  }

  addAchivement() {
    this.cv.cvAchievements.push(new Achievement('', null, null));
  }

  addCertification() {
    this.cv.cvCertification.push(new Certification('', null, null));
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

  compareFn(c1, c2): boolean {
     return c1 && c2 ? c1.id == c2.id : c1 == c2;
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }
}
