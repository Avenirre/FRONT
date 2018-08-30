import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import { Experience } from '../../../models/experience.model';
import { CV } from '../../../models/cv.model';
import { Education  } from '../../../models/education.model';
import { Job } from '../../../models/job.model';

declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  skills = [
      { value: 1, name: 'skill 1' },
      { value: 2, name: 'skill 2' },
      { value: 3, name: 'skill 3' },
      { value: 4, name: 'skill 4' },
      { value: 5, name: 'skill 5' },
      { value: 6, name: 'skill 6' },
      { value: 7, name: 'skill 7' },
      { value: 8, name: 'skill 8' },
      { value: 9, name: 'skill 9' },
  ]
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.cv = this.cvService.getCv();
  }
  addExperience() {
    this.cv['prof_info']['experience'].push(new Experience(''));
  }
  addEducation() {
    this.cv['personal_info']['education'].push(new Education('', '', ''));
  }
  addJob() {
    this.cv['prof_info']['jobs'].push(new Job('', '', -1));
  }
  addAchivement() {
    this.cv['prof_info']['achievements'].push('');
  }
  addCertification() {
    this.cv['prof_info']['certification'].push('');
  }
  addLanguage() {
      this.cv['personal_info']['languages'].push('');
  }
  setData() {
    this.cvService.setCv(this.cv);
    this.cvService.emitCvChanges();
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  openAll() {
    $('.collapse').collapse('toggle');
  }
}
