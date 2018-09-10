import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cv-form-select',
  templateUrl: './cv-form-select.component.html',
  styleUrls: ['./cv-form-select.component.scss']
})
export class CvFormSelectComponent implements OnInit {
  @Input() listItems: {value: string, displayValue: string}[];
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
