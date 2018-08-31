import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {DataService} from '../../../../services/data.service';

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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
