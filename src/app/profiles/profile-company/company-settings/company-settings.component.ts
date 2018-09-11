import {Component, OnInit} from '@angular/core';
import {Applicant} from '../../../../models/auth/applicant.model';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ValidatorService} from '../../../../services/validator.service';
import {CompanySettingsService} from '../company-settings.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: [
    './company-settings.component.scss',
    '../../../auth/form-main.scss'
  ],
})

export class CompanySettingsComponent implements OnInit {
  profile: Applicant;
  errors = {
    RegError: false,
    UserNameExists: false,
    ServerError: false
  };
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _settingsService: CompanySettingsService
  ) {}

  async ngOnInit() {
    this._settingsService.ngOnInit();
    this._settingsService._profileChanged.subscribe((profile) => {
      if (profile) {
      this.profile = profile;
      this.fulfillForm();
      }
    });
  }

  submitEdits() {
    const editedProfile = this.createApplicant();
    console.log(editedProfile);
    this._settingsService.updateProfile(editedProfile);
  }

  private fulfillForm() {
    this.regForm = this.fb.group({
      companyDetails: this.fb.group({
        companyName: [this.profile.companyName],
        country: [this.profile.country],
        website: [this.profile.website],
        cityTown: [this.profile.cityTown],
        street: [this.profile.street],
        houseBuilding: [this.profile.houseBuilding],
        postcode: [this.profile.postcode],
        phone: [this.profile.phone]
      }),
      applicantDetails: this.fb.group({
        firstName: [this.profile.firstName],
        lastName: [this.profile.lastName],
        position: [this.profile.position],
        email: [this.profile.email, [
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
          ),
          Validators.required
        ]],
        username: [this.profile.username, [
          Validators.required,
          Validators.pattern('[A-Za-z0-9-_]+'),
          Validators.minLength(3),
          Validators.maxLength(15)
        ]
        ],
      }),
      passwordGroup: this.fb.group({
          password: ['',
            [
              Validators.minLength(8),
              Validators.maxLength(15)
            ]
          ],
          confirmPass: [''],
        }, {validator: ValidatorService.matchPassword}
      )
    });
  }

  private createApplicant(): Applicant {
    const applicant = new Applicant();
    applicant.usertype = 'COMPANY';
    applicant.username = this.regForm.value['applicantDetails']['username'];
    applicant.firstName = this.regForm.value['applicantDetails']['firstName'];
    applicant.lastName = this.regForm.value['applicantDetails']['lastName'];
    applicant.email = this.regForm.value['applicantDetails']['email'];
    applicant.password = this.regForm.value['passwordGroup']['password'];
    applicant.country = this.regForm.value['companyDetails']['country'];
    applicant.website = this.regForm.value['companyDetails']['website'];
    applicant.cityTown = this.regForm.value['companyDetails']['cityTown'];
    applicant.street = this.regForm.value['companyDetails']['street'];
    applicant.houseBuilding = this.regForm.value['companyDetails']['houseBuilding'];
    applicant.postcode = this.regForm.value['companyDetails']['postcode'];
    applicant.phone = this.regForm.value['companyDetails']['phone'];
    applicant.companyName = this.regForm.value['companyDetails']['companyName'];
    return applicant;
  }
}
