import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../../../models/cv/cv.model';

@Component({
  selector: 'app-company-cv-full',
  templateUrl: './company-cv-full.component.html',
  styleUrls: ['./company-cv-full.component.scss']
})
export class CompanyCvFullComponent implements OnInit {

  @Input() cv: CV;

  constructor() { }

  ngOnInit() {
  }

}
