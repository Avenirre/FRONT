import {Component, OnInit} from '@angular/core';
import {routes} from '../../environments/environment.fake-roots';
import {ModalService} from '../../services/modal/modal.service';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TitlePageComponent} from '../title-page/title-page.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isTitlePage: boolean;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
  }


  openModal(link: string) {
    console.log(routes[link]);
    this.modalService.openModal(routes[link]);
  }

  isUserLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
