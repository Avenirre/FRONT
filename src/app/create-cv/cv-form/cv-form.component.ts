import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import { Experience } from '../../../models/experience.model';
import { CV } from '../../../models/cv.model';
import {Education} from '../../../models/education.model';
declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv: CV;
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.cv = this.cvService.getCv();
    this.addExperience();
    this.addEducation();
  }
  addExperience() {
    this.cv['prof_info']['experience'].push(new Experience(''));
  }
  addEducation() {
    this.cv['personal_info']['education'].push(new Education('', '', ''));
  }
  setData() {
    this.cvService.setCv(this.cv);
    this.cvService.emitCvChanges();
  }
  logSkills() {
    
  }
  openAll() {
    $('.collapse').collapse('toggle');
  }
}
