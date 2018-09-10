import {Injectable} from '@angular/core';
import {CV} from '../models/cv/cv.model';
import {environment} from '../environments/environment';
import {LocalSettings} from '../models/local-settings.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static names = environment.local;

  constructor() {
  }

// USER METHODS
  public static saveUser(data) {
    localStorage.setItem(this.names.profile, JSON.stringify(data));
  }

  public static removeUser() {
    localStorage.removeItem(this.names.profile);
  }

  public static getCurrentUser() {
    const user = localStorage.getItem(this.names.profile);
    return JSON.parse(user) || null;
  }

  public static getUserName() {
    const user = JSON.parse(localStorage.getItem(this.names.profile)).profile;
    // console.log(user.username);
    return user.username || null;
  }

  public static getUserType() {
    const user = JSON.parse(localStorage.getItem(this.names.profile)).profile;
    return user.usertype;
  }

  public static getUserToken() {
    const user = JSON.parse(localStorage.getItem(this.names.profile));
    if (user && user.token) {
      return user.token;
    }
    return null;
  }
// SETTINGS METHODS
  public static getSettings(): LocalSettings {
    const settings = localStorage.getItem(this.names.settings);
    return JSON.parse(settings) || null;
  }

  public static setCurrentFolder(folder: string) {
    let settings = this.getSettings();
    if (settings) {
      settings.profile.currentFolder = folder;
      localStorage.setItem(this.names.settings, JSON.stringify(settings));
    } else {
      settings = new LocalSettings();
      settings.profile.currentFolder = folder;
      localStorage.setItem(this.names.settings, JSON.stringify(settings));
    }
  }

  public static getCurrentFolder() {
    const settings = this.getSettings();
    if (settings && settings.profile && settings.profile.currentFolder) {
      return settings.profile.currentFolder;
    }
    return null;
  }
// END USER METHODS
// CV METHODS
  public static saveCV(cv: CV) {
    const cvStr = JSON.stringify(cv);
    localStorage.setItem(this.names.cv, cvStr);
  }

  public static getCV() {
    const cv = JSON.parse(localStorage.getItem(this.names.cv));
    return cv || null;
  }

  public static getCvTemplate() {
    const template = JSON.parse(localStorage.getItem(this.names.cv));
    return template || null;
  }

// END CV METHODS
}
