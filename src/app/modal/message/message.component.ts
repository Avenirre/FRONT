import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    '../../auth/form-main.scss',
    './message.component.scss'
  ]
})
export class MessageComponent implements OnInit {
  message: string;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.message = this._route.snapshot.queryParams['message'];
  }

}
