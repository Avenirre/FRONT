import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-title-page-header',
  templateUrl: './title-page-header.component.html',
  styleUrls: ['./title-page-header.component.scss']
})
export class TitlePageHeaderComponent implements OnInit {
  private routes = environment.routes;

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  openModal(link: string) {
    this.modalService.openModal(this.routes[link]);
  }

  onCreateCv() {
    // const cvTypeChosen = localStorage.getItem('cvTypeChosen');
    // const cvTypeToNavigate = cvTypeChosen === null ? '0' : cvTypeChosen;
    this.router.navigate([this.routes.cvCreate]);
  }
}















