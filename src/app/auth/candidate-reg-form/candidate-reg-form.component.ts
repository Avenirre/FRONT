import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {Applicant} from '../../../models/auth/applicant.model';
import {FormBuilder, Validators} from '@angular/forms';
import {CvService} from '../../../services/cv.service';
import {ValidatorService} from '../../../services/validator.service';
import {CV} from '../../../models/cv/cv.model';
import {LoginData} from '../../../models/auth/login-data.model';

@Component({
  selector: 'app-candidate-reg-form',
  templateUrl: './candidate-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    './candidate-reg-form.component.scss'
  ]
})
export class CandidateRegFormComponent implements OnInit {
  private routes = environment.routes;
  errors = {
    RegError: false,
    UserNameExists: false,
    ServerError: false
  };
  regForm = this.fb.group({
    applicantDetails: this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: ['',
      ],
      email: ['', Validators.pattern(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
      )],
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

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService,
    private cvService: CvService
  ) {
  }

  private createApplicant(): Applicant {
    const applicant = new Applicant();
    applicant.usertype = 'CANDIDATE';
    applicant.username = this.regForm.value['applicantDetails']['username'];
    applicant.firstName = this.regForm.value['applicantDetails']['firstName'];
    applicant.lastName = this.regForm.value['applicantDetails']['lastName'];
    applicant.email = this.regForm.value['applicantDetails']['email'];
    applicant.phone = this.regForm.value['applicantDetails']['phone'];
    applicant.password = this.regForm.value['passwordGroup']['password'];
    return applicant;
  }

  ngOnInit() {
  }

  openCompanyModal() {
    this.modalService.openModal(this.routes['regCompany']);
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
          this.authService.login(loginData);
          if (this.cvService.expectingCv) {
            this.cvService.setCV();
            this.cvService.saveCV();
          }
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

  private resetErrors() {
    this.errors.UserNameExists = false;
    this.errors.RegError = false;
    this.errors.ServerError = false;
  }
}
