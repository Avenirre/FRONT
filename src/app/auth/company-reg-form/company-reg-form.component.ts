import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {Company} from '../../../services/support/company.service';
import {AuthService} from '../../../services/auth/auth.service';

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
  constructor(
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService
  ) {
    this.company.user_type = 'company';
  }

  ngOnInit() {
  }

  openModal(link: string) {
    this.modalService.openModal(routes[link]);
  }

  submitRegistration() {
    console.log(this.company);
    this.modalService.closeModal();
    this.authService.createCompany(this.company);
  }
}
