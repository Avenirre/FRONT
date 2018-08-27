import {ApplicantInterface} from '../../interfaces/applicant.interface';

export class Company implements ApplicantInterface {
  public username = '';
  public user_type = '';
  public firstName = '';
  public lastName = '';
  public email = '';
  public phone = '';
  public password = '';
  public language = [''];
  public residence = '';
  public linkedIn = '';
  public birthday = '';
  public website = '';
  public country = '';
  public city_town = '';
  public street = '';
  public house_building = '';
  public postcode = '';
  public position = '';
  constructor() {}
}
