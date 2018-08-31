import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {Applicant} from '../../../models/auth/applicant.model';
import {NgForm} from '@angular/forms';
import {ValidateService} from '../../../services/validate.service';

@Component({
  selector: 'app-candidate-reg-form',
  templateUrl: './candidate-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    './candidate-reg-form.component.scss'
  ]
})
export class CandidateRegFormComponent implements OnInit {
  regErr = false;
  private routes = environment.routes;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService
  ) {
  }

  private createApplicant(form: NgForm): Applicant {
    const applicant = new Applicant();
    applicant.user_type = 'candidate';
    applicant.username = form.value['username'];
    applicant.firstName = form.value['firstName'];
    applicant.lastName = form.value['lastName'];
    applicant.email = form.value['email'];
    applicant.phone = form.value['phone'];
    applicant.password = form.value['password'];
    return applicant;
  }

  ngOnInit() {
  }

  openCompanyModal() {
    this.modalService.openModal(this.routes['regCompany']);
  }

  submitRegistration(form: NgForm) {
    // this.modalService.closeModal();
    const applicant = this.createApplicant(form);
    // console.log(applicant);
    this.authService.createApplicant(applicant);
  }


}
