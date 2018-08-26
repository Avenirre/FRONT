import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

declare var $: any;

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: [
    '../modal-content.component.scss',
    './modal-login.component.scss'
  ]
})
export class ModalLoginComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  openModal(link: string) {
    this.modalService.openModal(routes[link]);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  login() {
    this.modalService.closeModal();
    this.router.navigate(['/profile']);
  }
}
