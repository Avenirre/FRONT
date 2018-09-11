import {Injectable, EventEmitter, Output, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {TextService} from '../../services/text.service';
import {ModalMessageInterface} from '../../interfaces/modal-message.interface';
import {DataService} from '../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnInit {
  @Output() modalStateChanged = new EventEmitter<boolean>();
  defModalMessage = new BehaviorSubject(this.textService.getDefaultModalMessage());
  currentMessage = this.defModalMessage.asObservable();

  constructor(
    private textService: TextService,
    private router: Router,
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.modalStateChanged.emit(false);
    });
  }

  ngOnInit(): void {

  }

  /**
   * returns EventEmitter of main modal window,
   * which defines opened or closed state of modal;
   * @returns {EventEmitter<boolean>}
   */
  public getModalChangedEmitter(): EventEmitter<boolean> {
    return this.modalStateChanged;
  }

  /**
   * shows modal with custom message of type ModalMessageInterface
   * @param message
   */
  private showMessage(message: ModalMessageInterface) {
    this.defModalMessage.next(message);
    this.router.navigate(['..', {outlets: {modal: ['message']}}]);
  }

  /**
   * opens modal windows with given in {link} type of content
   * type of {link} content defines by current environment.routes object
   * @param {string} link
   */
  public openModal(link: string) {
    this.router.navigate(['/', {outlets: {modal: [link]}}]);
    this.modalStateChanged.emit(true);
  }

  /**
   * closes currently opened modal
   */
  public closeModal() {
    this.modalStateChanged.emit(false);
    this.router.navigate(['..', {outlets: {modal: null}}]);
  }

  /**
   * fire modal with success authorization message;
   */
  public showSuccessLogin() {
    const currentLogin = DataService.getUserName();
    const message = this.textService.getSuccessLoginMessage(currentLogin);
    this.showMessage(message);
  }

  /**
   * creates modal with unauthorized user text message;
   */
  public showUnauthorizedMessage() {
    const message = this.textService.getUnauthorizedMessage();
    this.showMessage(message);
  }

  /**
   * creates modal with custom given error text message;
   * @param type
   */
  public showErrorMessage(type: string) {
    if (type === 'registration') {
      const message = this.textService.getRegistrationErrorMessage();
      this.showMessage(message);
    }
  }
}
