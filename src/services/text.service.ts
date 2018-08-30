import {Injectable} from '@angular/core';
import {ModalMessageInterface} from '../interfaces/modal-message.interface';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor() {
  }

  /**
   * returns message object of type ModalMessageInterface of successful login
   * with given user name;
   * @param {string} username
   * @returns {ModalMessageInterface}
   */
  public getSuccessLoginMessage(username: string): ModalMessageInterface {
    return {
      title: 'Success login',
      message: `Hello, ${username}! You are successfully logged in!`
    };
  }

  /**
   * returns message object of type ModalMessageInterface of default modal
   * message window state;
   * @param {string} username
   * @returns {ModalMessageInterface}
   */
  public getDefaultModalMessage(): ModalMessageInterface {
    return {
      title: 'empty message',
      message: `empty message: probably you reloaded current window;
                this is temporary message window and messages, displayed here
                don't save after reload;`
    };
  }
}
