import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-cvs',
  templateUrl: './profile-cvs.component.html',
  styleUrls: ['./profile-cvs.component.scss']
})
export class ProfileCvsComponent implements OnInit {
  private cvs = [
    {id: 1, name: "MyFirstCvName", views: 32, approved: true},
    {id: 2, name: "MySecondCvName", views: 32, approved: true},
    {id: 3, name: "MyThirdCvName", views: 32, approved: false}
  ]
  constructor() { }

  ngOnInit() {
  }

}
