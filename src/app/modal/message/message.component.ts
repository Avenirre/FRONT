import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../modal.service';
import {ModalMessageInterface} from '../../../interfaces/modal-message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    '../../auth/form-main.scss',
    './message.component.scss'
  ]
})
export class MessageComponent implements OnInit {
  message = {
    title: 'empty message',
    message: `empty message: probably you reloaded current message;
              this is temporary message window and messages, displayed here
              don't save after reload;`
  };

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
  }

  /**
   * receiving of current displaying message from modals service;
   */
  ngOnInit() {
    this.modalService.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }

  /**
   * makes request to modals service to close current modal;
   */
  closeModal() {
    this.modalService.closeModal();
  }
}
