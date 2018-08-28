import {Component, ElementRef, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {LoginDataInterface} from '../../../interfaces/login-data.interface';

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
  loginError = false;

  constructor(
    private authService: AuthService,
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

  onLogin(form: NgForm) {
    const loginData: LoginDataInterface = {
      login: form.value['login'],
      password: form.value['password']
    };
    this.authService.login(loginData)
      .then((loginMessage: string) => {
        console.log('login message: ' + loginMessage);
        this.router.navigate(['..', {outlets: {modal: ['message']}}], { queryParams: { message: 'login succeed!' } });
     // this.modalService.closeModal();

      }, (loginMessage) => {
        console.log('error message: ' + loginMessage);
        this.loginError = true;
      });
  }
}
