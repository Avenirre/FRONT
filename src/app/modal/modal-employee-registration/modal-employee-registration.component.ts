import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {EmployeeInterface} from '../../../interfaces/employee.interface';
import {ApiCandidatesService} from '../../../services/rest/api-candidates.service';
import {Employee} from '../../../services/employee.service';

@Component({
  selector: 'app-modal-employee-registration',
  templateUrl: './modal-employee-registration.component.html',
  styleUrls: [
    '../modal-content.component.scss',
    './modal-employee-registration.component.scss'
  ]
})
export class ModalEmployeeRegistrationComponent implements OnInit {
  employee: EmployeeInterface = new Employee();
  public confirmPass: string;

  constructor(
      private modalService: ModalService,
      private router: Router,
      private apiCandidatesService: ApiCandidatesService
  ) {
  }

  ngOnInit() {
    this.employee.user_type = 'candidate';
  }

  openModal(link: string) {
    this.modalService.openModal(routes[link]);
  }

  submitRegistration() {
    this.modalService.closeModal();
    console.log(this.employee);
    this.apiCandidatesService.createEmployee(this.employee);
    this.router.navigate(['/profile']);
  }
}
