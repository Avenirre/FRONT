import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../../../models/cv/cv.model';

@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.scss']
})
export class CvItemComponent implements OnInit {
  @Input() cv: CV;
  constructor() { }

  ngOnInit() {
  }

}
