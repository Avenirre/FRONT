import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cv-form-checkbox-group',
  templateUrl: './cv-form-checkbox-group.component.html',
  styleUrls: ['./cv-form-checkbox-group.component.scss']
})
export class CvFormCheckboxGroupComponent implements OnInit {
  @Input() items: {value: string, displayValue: string}[];
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
