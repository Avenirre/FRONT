import {Component, OnInit, ViewChild} from '@angular/core';
import {Applicant} from '../../../../models/auth/applicant.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
  account: Applicant;
  @ViewChild('form') form;

  constructor() { }

  ngOnInit() {
  }

  submitEdits() {
    console.log(this.form);
  }
}
