import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {environment} from '../../../environments/environment';
import {Applicant} from '../../../models/auth/applicant.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-company-reg-form',
  templateUrl: './company-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    'company-reg-form.component.scss'
  ]
})
export class CompanyRegFormComponent implements OnInit {
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
      email: [''],
      username: ['', Validators.required],
    }),
    passwordGroup: this.fb.group({
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    })
  });

  applicant: Applicant = new Applicant();
  private routes = environment.routes;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
  ) {
  }

  ngOnInit() {
    this.applicant.user_type = 'COMPANY';
  }

  openCandidateModal() {
    this.modalService.openModal(this.routes['regCandidate']);
  }

  submitRegistration() {
    console.log(this.regForm.value);
    // this.assembleApplicant(form);
    // console.log(this.company);
    // this.modalService.closeModal();
    // this.authService.createApplicant(this.applicant);
  }

  private assembleApplicant(form: NgForm) {
    // this.applicant.firstName =
  }
}

















