import {Injectable} from '@angular/core';
import {CV} from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

// USER METHODS
  public static saveUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  public static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return JSON.parse(user) || null;
  }

  public static getUserName() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(user.username);
    return user.username || null;
  }

  public static getUserType() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let usertype = user.usertype;
    usertype = usertype.slice(1, usertype.length - 1);
    return usertype;
  }

  public static getUserToken() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.token) {
      return user.token;
    }
    return null;
  }
// END USER METHODS
// CV METHODS
  public static saveCV(cv: CV) {
    const cvStr = JSON.stringify(cv);
    localStorage.setItem('currentCV', cvStr);
  }

  public static getCV() {
    const cv = JSON.parse(localStorage.getItem('currentCV'));
    return cv || null;
  }

  public static getCvTemplate() {
    const template = JSON.parse(localStorage.getItem('currentCV'));
    return template || null;
  }
// END CV METHODS
}
