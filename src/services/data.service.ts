import {Injectable} from '@angular/core';
import {CV} from '../models/cv/cv.model';
import {environment} from '../environments/environment';
import {LocalSettings} from '../models/local-settings.model';
import {SectionUnit} from '../enums/section.enum';
import {ProfileFolder} from '../models/profileFolder';
import {LocalProfile} from '../models/local-storage/local-profile.settings';
import {AuthService} from '../app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static names = environment.local;


  constructor() {
  }

// USER METHODS
  public static saveUser(data): void {
    const profile = new LocalProfile(data['profile'], data['token']);
    localStorage.setItem(this.names.profile, JSON.stringify(profile));
  }

  public static removeUser(): void {
    localStorage.removeItem(this.names.profile);
  }

  public static getCurrentUser(): LocalProfile {
    const user = localStorage.getItem(this.names.profile);
    return <LocalProfile>JSON.parse(user) || null;
  }

  public static getUserName() {
    const user = <LocalProfile>JSON.parse(localStorage.getItem(this.names.profile));
    return user.profile['username'] || null;
  }

  public static getUserType() {
    const user = <LocalProfile>JSON.parse(localStorage.getItem(this.names.profile));
    return user.profile['usertype'];
  }

  public static getUserToken() {
    const user = <LocalProfile>JSON.parse(localStorage.getItem(this.names.profile));
    if (user && user.token) {
      return user.token;
    }
    return null;
  }

  static getUserId() {
    const userId = JSON.parse(localStorage.getItem(this.names.profile)).profile.id;
    return userId || null;
  }

// SETTINGS METHODS
  public static getSettings(): LocalSettings {
    const settings = localStorage.getItem(this.names.settings);
    return JSON.parse(settings) || null;
  }

  public static setCurrentFolder(folder: ProfileFolder) {
    let settings = this.getSettings();
    if (!settings) {
      settings = new LocalSettings();
    }
    settings.profile.currentFolder = JSON.stringify(folder);
    localStorage.setItem(this.names.settings, JSON.stringify(settings));
  }

  public static setMenuSection(section: SectionUnit) {
    let settings = this.getSettings();
    if (!settings) {
      settings = new LocalSettings();
    }
    settings.profile.currentSection = section;
    localStorage.setItem(this.names.settings, JSON.stringify(settings));
  }

  public static getCurrentFolder(): { id: number, name: string } {
    const settings = this.getSettings();
    if (settings && settings.profile && settings.profile.currentFolder) {
      return JSON.parse(settings.profile.currentFolder);
    }
    return null;
  }

  public static getCurrentMenuSection(): number {
    const settings = this.getSettings();
    if (settings && settings.profile && settings.profile.currentSection !== undefined) {
      return settings.profile.currentSection;
    }
    return null;
  }

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


  static toMilliseconds(time: { days: number; hours: number; minutes: number; seconds: number }) {
    let res;
    res = time.seconds * 1000;
    res += time.minutes * 60 * 1000;
    res += time.hours * 60 * 60 * 1000;
    res += time.days * 24 * 60 * 60 * 1000;
    return res;
  }
}
