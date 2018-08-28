import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-btns-logged',
  templateUrl: './btns-logged.component.html',
  styleUrls: [
    '../header-controls.scss',
    './btns-logged.component.scss'
  ]
})
export class BtnsLoggedComponent implements OnInit {
  currentUsername = localStorage.getItem('currentLogin');

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
