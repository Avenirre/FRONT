import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  public imagesUrl;

  constructor() { }

  ngOnInit() {
    this.imagesUrl = [
      'https://www.openkm.com/resources/images/icon/document-management-big.png',
      'https://www.openkm.com/resources/images/icon/document-management-big.png',
      'https://www.openkm.com/resources/images/icon/document-management-big.png',
    ];
  }

}
