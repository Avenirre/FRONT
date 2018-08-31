import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {TextService} from '../../../services/text.service';
import {LoginData} from '../../../models/auth/login-data.model';

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
  private routes = environment.routes;

  constructor(
    private textService: TextService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  /**
   * makes request to modals service to open modal dialog
   * of creation new candidate;
   */
  openCandidateModal() {
    this.modalService.openModal(this.routes['regCandidate']);
  }

  /**
   * makes request to modals service to close current modal
   */
  closeModal() {
    this.modalService.closeModal();
  }

  /**
   * reads content of username and password input fields of
   * login form and makes request to service; if user exists,
   * shows success modal message; if user does not exists,
   * shows error message;
   * @param {NgForm} form
   */
  onLogin(form: NgForm) {
    const loginData = new LoginData(form.value['username'], form.value['password']);
    // console.log(loginData);
    this.authService.login(loginData)
      .then(() => {
        this.modalService.showSuccessLogin();
      }, (loginMessage) => {
        this.loginError = true;
      });
  }
}














