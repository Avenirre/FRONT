import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Company} from '../../../services/support/company.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-company-reg-form',
  templateUrl: './company-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    'company-reg-form.component.scss'
  ]
})
export class CompanyRegFormComponent implements OnInit {
  company: Company = new Company();
  confirmPass: string;
  private routes = environment.routes;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService
  ) {
    this.company.user_type = 'company';
  }

  ngOnInit() {
  }

  openCandidateModal(link: string) {
    this.modalService.openModal(this.routes['regCandidate']);
  }

  submitRegistration() {
    console.log(this.company);
    this.modalService.closeModal();
    this.authService.createCompany(this.company);
  }
}
