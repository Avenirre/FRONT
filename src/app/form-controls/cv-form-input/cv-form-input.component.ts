import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-form-input',
  templateUrl: './cv-form-input.component.html',
  styleUrls: ['./cv-form-input.component.scss']
})
export class CvFormInputComponent implements OnInit {
  actionUnit = ActionUnit;
  menuAtion: ActionUnit = this.actionUnit.NONE;

  constructor() { }

  ngOnInit() {
  }

}

enum ActionUnit {
  NONE, ADD_SKILL
}
