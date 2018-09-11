import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {environment} from '../../../environments/environment';
import {Applicant} from '../../../models/auth/applicant.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidatorService} from '../../../services/validator.service';
import {AuthService} from '../auth.service';
import {LoginData} from '../../../models/auth/login-data.model';
import {CV} from '../../../models/cv/cv.model';

@Component({
  selector: 'app-company-reg-form',
  templateUrl: './company-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    'company-reg-form.component.scss'
  ]
})
export class CompanyRegFormComponent implements OnInit {
  errors = {
    RegError: false,
    UserNameExists: false,
    ServerError: false
  };
  regForm = this.fb.group({
    companyDetails: this.fb.group({
      companyName: [''],
      country: [''],
      website: [''],
      cityTown: [''],
      street: [''],
      houseBuilding: [''],
      postcode: [''],
      phone: ['']
    }),
    applicantDetails: this.fb.group({
      firstName: [''],
      lastName: [''],
      position: [''],
      email: ['', [
        Validators.required,
        Validators.pattern(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
      )]],
      username: ['', [
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
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15)
          ]
        ],
        confirmPass: ['', Validators.required],
      }, {validator: ValidatorService.matchPassword}
    )
  });

  validation_messages = {
    'email': [
      {type: 'pattern', message: 'Email is not valid'}
    ],
    'username': [
      {type: 'validUsername', message: 'Your username has already been taken'},
      {type: 'pattern', message: 'Your username must contain only numbers, letters and "-" or "_" symbols'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 8 characters long'},
      {type: 'maxlength', message: 'Password cannot be more than 15 characters long'},
    ]
  };

  private routes = environment.routes;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {}

  openCandidateModal() {
    this.modalService.openModal(this.routes['regCandidate']);
  }

  submitRegistration() {
    this.resetErrors();
    const applicant = this.createApplicant();
    this.authService.createApplicant(applicant)
      .then(
        (response) => {
          const loginData = new LoginData(
            applicant.username,
            applicant.password
          );
          console.log('login data: ', loginData);
          this.authService.login(loginData);
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
            this.errors.UserNameExists = true;
          } else if (error.status === 500) {
            this.errors.ServerError = true;
          } else {
            this.errors.RegError = true;
          }
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

  private resetErrors() {
    this.errors.UserNameExists = false;
    this.errors.RegError = false;
    this.errors.ServerError = false;
  }
}

















