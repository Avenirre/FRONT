import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openAll() {
    $('.collapse').collapse('toggle');
  }
}
