import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {DataService} from '../../../../services/data.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-btns-logged',
  templateUrl: './btns-logged.component.html',
  styleUrls: [
    '../header-controls.scss',
    './btns-logged.component.scss'
  ]
})
export class BtnsLoggedComponent implements OnInit {
  currentUsername = DataService.getUserName();
  routes = environment.routes;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
