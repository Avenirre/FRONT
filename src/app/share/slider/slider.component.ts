import {Component, Input, OnInit} from '@angular/core';

const imagesPath = 'assets/cv-slider';
const ITEMS_SHOWED = 5;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() _items: { id: number, text: string, imgUrl: string }[] = [];
  _currentItems: { id: number, text: string, imgUrl: string }[] = [];
  isLeftEnd: boolean;
  isRightEnd: boolean;

  constructor() {
  }

  ngOnInit() {
    this.initCurrentItems();
    this.checkArrowsState();
    console.log(this._items);
  }

  initCurrentItems() {
    this._currentItems = this._items.slice(0, ITEMS_SHOWED);
  }

  private checkArrowsState() {
    this.isLeftEnd = this._currentItems[0].id === 0;
    this.isRightEnd = this._currentItems[ITEMS_SHOWED - 1] === this._items[this._items.length - 1];
  }

  prev() {
    const nextStart = this._currentItems[0].id - 1;
    const nextEnd = nextStart + ITEMS_SHOWED - 1;

    if (nextStart >= 0) {
      this._currentItems = this._items.slice(nextStart, nextEnd + 1);
    }
    this.checkArrowsState();
  }

  next() {
    const nextStart = this._currentItems[0].id + 1;
    const nextEnd = nextStart + ITEMS_SHOWED - 1;

    if (nextEnd < this._items.length) {
      this._currentItems = this._items.slice(nextStart, nextEnd + 1);
    }
    this.checkArrowsState();
  }

}


























