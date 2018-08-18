import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

@Component({
  selector: 'app-modal-employer-registration',
  templateUrl: './modal-employer-registration.component.html',
  styleUrls: ['./modal-employer-registration.component.scss']
})
export class ModalEmployerRegistrationComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeModalState(link: string) {
    this.router.navigate(['/' + routes[link]]);
  }

  submitRegistration() {
    this.router.navigate(['/profile']);
  }
}
