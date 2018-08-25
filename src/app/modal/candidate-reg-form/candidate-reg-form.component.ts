import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';
import {ApiCandidatesService} from '../../../services/rest/api-candidates.service';
import {Candidate} from '../../../services/candidate.service';

@Component({
  selector: 'app-candidate-reg-form',
  templateUrl: './candidate-reg-form.component.html',
  styleUrls: [
    '../modal-content.component.scss',
    './candidate-reg-form.component.scss'
  ]
})
export class CandidateRegFormComponent implements OnInit {
  candidate: Candidate = new Candidate();
  confirmPass: string;

  constructor(
      private modalService: ModalService,
      private router: Router,
      private apiCandidatesService: ApiCandidatesService
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
    console.log(this.candidate);
    this.apiCandidatesService.createCandidate(this.candidate);
    this.router.navigate(['/profile']);
  }
}
