import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RenderService} from '../../../services/render.service';

@Component({
  selector: 'app-cv-form-chips',
  templateUrl: './cv-form-chips.component.html',
  styleUrls: ['./cv-form-chips.component.scss']
})
/**
 * chips coponent:
 * receives array of items in model: {id: number, value: string}[] and represents it
 * with group of separate itemes; each item can be deleted with firing new 'listChanged'
 * event which returns new array of items without deleted item;
 *
 * receives: [listItems]="{id: number, value: string}[]"
 * returns: (listChanged)="eventHandler(newList)"
 */
export class CvFormChipsComponent implements OnInit {
  @Input() listItems: {id: number, value: string}[];
  @Output() listChanged = new EventEmitter<{id: number, value: string}[]>();

  constructor(private renderService: RenderService) {}

  ngOnInit() {
  }

  deleteItem(id: number) {
    const index = this.listItems.findIndex((c) => {
      return c.id === id;
    });
    this.renderService.removedSkill.emit(this.listItems[index]);
    this.listItems.splice(index, 1);
    this.listChanged.emit(this.listItems);
  }
}
