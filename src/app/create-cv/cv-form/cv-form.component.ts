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

declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  skills = [
    new Skill(1, 'Java'),
    new Skill(2, 'JavaScript'),
    new Skill(3, 'C#'),
    new Skill(4, 'PHP'),
    new Skill(5, 'C++')
  ];
  languages = [
      new Language(1, 'Hebrew'),
      new Language(2, 'English'),
      new Language(3, 'Russian'),
      new Language(4, 'Ukrainian'),
  ];
  positions = [
      new Position(1, 'Programmer'),
      new Position(2, 'Tester'),
      new Position(3, 'Full Stack Developer'),
      new Position(4, 'Back End Developer'),
      new Position(4, 'Front End Developer'),
  ];

  constructor(private cvService: CvService) {
  }

  ngOnInit() {
    this.cv = this.cvService.getCV();
  }

  // addExperience() {
  //   this.cv['prof_info']['experience'].push(new Experience(''));
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
    this.cv.cvLang.push(new Language(null, ''));
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
