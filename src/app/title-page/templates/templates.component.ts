import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  _items: { id: number, text: string, imgUrl: string }[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initItems();
  }

  private initItems() {
    for (let i = 0; i < 10; i++) {
      const item = {
        id: i,
        text: `item ${i + 1}`,
        imgUrl: ''
      };
      this._items.push(item);
    }
  }

}
