import {Component, OnInit} from '@angular/core';
import {routes} from '../../environments/environment.fake-roots';
import {ModalService} from '../../services/modal/modal.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private authService: AuthService
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
