import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HeaderControlsService} from './header-controls.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isTitlePage: boolean;

  constructor(
    private headerService: HeaderControlsService,
    private authService: AuthService,
    router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isTitlePage = true;
        } else {
          this.isTitlePage = false;
        }
      }
    });

  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return AuthService.isLoggedIn();
  }
}
