import { Component, OnInit } from '@angular/core';
import {CvService} from '../cv.service';
declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  cv;
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.cv = this.cvService.getCv();
  }

  setData() {
    console.log(this.cv['first_name'] + ' ' + this.cv['second_name']);
    this.cvService.setCv(this.cv);
    this.cvService.emitCvChanges();
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }
}
