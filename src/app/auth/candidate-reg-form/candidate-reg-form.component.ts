import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {Candidate} from '../../../services/support/candidate.service';
import {AuthService} from '../../../services/auth/auth.service';

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

  constructor(
      private modalService: ModalService,
      private router: Router,
      private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.candidate.user_type = 'candidate';
  }

  openModal(link: string) {
    this.modalService.openModal(routes[link]);
  }

  submitRegistration() {
    this.modalService.closeModal();
    this.authService.createCandidate(this.candidate);
  }
}
