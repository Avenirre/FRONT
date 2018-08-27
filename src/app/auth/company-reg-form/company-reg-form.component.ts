import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {Company} from '../../../services/support/company.service';
import {ApiCompaniesService} from '../../../services/rest/api-companies.service';

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
    private apiCompaniesService: ApiCompaniesService
  ) {
    this.company.user_type = 'company';
  }

  ngOnInit() {
  }

  openModal(link: string) {
    this.modalService.openModal(routes[link]);
    // this.router.navigate(['/' + routes[link]]);
  }

  submitRegistration() {
    this.modalService.closeModal();
    this.router.navigate(['/profile']);
    console.log(this.company);
    this.apiCompaniesService.createCompany(this.company);
    // this.router.navigate(['/profile']);
  }
}
