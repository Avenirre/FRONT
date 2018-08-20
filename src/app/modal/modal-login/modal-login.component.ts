import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  openModal(link: string) {
    // this.router.navigate(['/' + routes[link]]);
      this.modalService.openModal(routes[link]);
  }

  login() {
    this.router.navigate(['/profile']);
  }
}
