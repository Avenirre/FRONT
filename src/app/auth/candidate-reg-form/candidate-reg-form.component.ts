import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Candidate} from '../../../services/support/candidate.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-candidate-reg-form',
  templateUrl: './candidate-reg-form.component.html',
  styleUrls: [
    '../form-main.scss',
    './candidate-reg-form.component.scss'
  ]
})
export class CandidateRegFormComponent implements OnInit {
  candidate: Candidate = new Candidate();
  confirmPass: string;
  private routes = environment.routes;

  constructor(
      private modalService: ModalService,
      private router: Router,
      private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.candidate.user_type = 'candidate';
  }

  openCompanyModal() {
    this.modalService.openModal(this.routes['regCompany']);
  }

  submitRegistration() {
    this.modalService.closeModal();
    this.authService.createCandidate(this.candidate);
  }
}
