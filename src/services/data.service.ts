import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public static saveUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  public static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return JSON.parse(user);
  }

  static getUserName() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user.username || 'undefined';
  }
}
