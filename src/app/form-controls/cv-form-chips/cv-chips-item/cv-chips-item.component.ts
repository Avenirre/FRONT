import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cv-chips-item',
  templateUrl: './cv-chips-item.component.html',
  styleUrls: ['./cv-chips-item.component.scss']
})
export class CvChipsItemComponent implements OnInit {
  @Input() item: {id: number, value: string};
  @Output() itemDeleted = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDeleteItem() {
    this.itemDeleted.emit(this.item.id);
  }
}
