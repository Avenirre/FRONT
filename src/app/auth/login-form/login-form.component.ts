import {Component, ElementRef, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {NgForm} from '@angular/forms';
// declare var $: any;

@Component({
  selector: 'app-modal-login',
  templateUrl: './login-form.component.html',
  styleUrls: [
    '../form-main.scss',
    './login-form.component.scss'
  ]
})
export class LoginFormComponent implements OnInit {

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

  login(form: NgForm) {
    console.log(form.value);
    this.modalService.closeModal();
    // this.router.navigate(['/profile', {outlets: {modal: null}}]);
    // this.router.navigate(['/profile']);
  }
}
