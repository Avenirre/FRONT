import {Component, OnInit, OnDestroy} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  isOpened = false;
  message = {
    title: '',
    message: ''
  };
  isOpenedChangedEvent: Event;
  messageCreatedEvent: Event;

  constructor(
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.isOpenedChangedEvent = this.modalService.getModalChangedEmitter()
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  ngOnDestroy(): void {
  }

  public closeModal() {
    this.isOpened = false;
    this.modalService.closeModal();
  }

  public openModal() {
    this.isOpened = true;
  }

  onModalKeyPressed(event) {
    console.log(event);
  }
}
