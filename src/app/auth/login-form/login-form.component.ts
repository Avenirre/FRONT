import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {TextService} from '../../../services/text.service';
import {LoginData} from '../../../models/auth/login-data.model';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';

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
  errors = {
    unauthorised: false,
    dif: false,
    message: null
  };
  private routes = environment.routes;

  constructor(
    private textService: TextService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router,
    private cvService: CvService
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
    this.resetErrors();
    const loginData = new LoginData(form.value['username'], form.value['password']);
    this.authService.login(loginData)
      .then(
        () => {
          if (this.cvService.expectingCv) {
            this.cvService.setCV();
            console.log(`Expecting CV:`);
            console.log(this.cvService.cv);
            this.cvService.saveCV();
          }
        },
        (error) => {
          console.log(error);
          this.errors.message = error['error']['message'];
            console.log('login error', error);
          if (error.status === 401) {
            this.errors.unauthorised = true;
          } else {
            this.errors.dif = true;
          }
        this.loginError = true;
      });
  }

  private resetErrors() {
    this.errors.message = null;
    this.errors.unauthorised = false;
    this.errors.dif = false;
  }
}














