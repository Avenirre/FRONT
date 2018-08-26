import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }
}
