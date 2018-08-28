import { Component, OnInit } from '@angular/core';
import {HeaderControlsService} from '../../header-controls.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-btns-unlogged',
  templateUrl: './btns-unlogged.component.html',
  styleUrls: [
    '../header-controls.scss',
    './btns-unlogged.component.scss',
  ]
})
export class BtnsUnloggedComponent implements OnInit {
  private routes = environment.routes;
  constructor(
    private headerService: HeaderControlsService,
    ) { }

  ngOnInit() {
  }

  onLogin() {
    this.headerService.openModal('login');
  }

  onRegister() {
    this.headerService.openModal('regCandidate');
  }

}
