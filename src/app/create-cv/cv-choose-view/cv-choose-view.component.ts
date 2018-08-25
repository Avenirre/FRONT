import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-choose-view',
  templateUrl: './cv-choose-view.component.html',
  styleUrls: ['./cv-choose-view.component.scss']
})
export class CvChooseViewComponent implements OnInit {
  templates = ['1', '2', '3', '4', '5'];
  constructor() { }

  ngOnInit() {
  }

}
