import {Injectable} from '@angular/core';
import {Candidate} from '../support/candidate.service';
import {ApiService} from '../rest/api.service';
import {Company} from '../support/company.service';
import {LoginDataInterface} from '../../interfaces/login-data.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    })
  };

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  /**
   * check if user logged in
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * login user with given login data
   */
  public login(user: LoginDataInterface): Promise<string> {
    console.log('user: ', user);
    return new Promise((resolve, reject) => {
      this.apiService.post<LoginDataInterface>(['login', 'validate'], user, this.httpOptions)
        .subscribe(
          (data) => {
            // console.log('is logged in: ' + this.isLoggedIn());
            localStorage.setItem('token', data['token']);
            console.log('token: ', localStorage.getItem('token'));
            console.log('is logged in: ' + this.isLoggedIn());
            resolve('succsess');
          },
          (error: Error) => {
            console.log(error);
            reject('error');
          });
    });


  }

  /**
   *logout current user
   */
  public logout(): boolean {
    if (this.isLoggedIn()) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }

  /**
   * makes post request to the back-end server's create candidate method
   * and sends JSON with candidate data;
   * @param {Candidate} employee
   */
  public createCandidate(candidate: Candidate) {
    this.apiService.post<Candidate>(['candidates'], candidate, this.httpOptions)
      .subscribe(
        (data) => {
          console.log(data);
        });
  }

  /**
   * makes post request to the back-end server's create company method
   * and sends JSON with candidate data;
   * @param {Candidate} employee
   */
  public createCompany(company: Company) {
    this.apiService.post<Company>(['companies'], company, this.httpOptions)
      .subscribe(
        (data) => {
          console.log(data);
        });
  }
}
