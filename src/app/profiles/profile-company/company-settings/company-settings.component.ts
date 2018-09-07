import {Component, OnInit, ViewChild} from '@angular/core';
import {Applicant} from '../../../../models/auth/applicant.model';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {ApiService} from '../../../../services/rest/api.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
  account: Applicant;
  @ViewChild('form') form;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  submitEdits() {
    console.log(this.form);
  }

  getProfile() {
    const profile = DataService.getCurrentUser();
    console.log(profile);

  }
}
