import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  @Output() modalStateChanged = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor() { }
}
