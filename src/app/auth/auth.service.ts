import {Injectable} from '@angular/core';
import {Candidate} from '../../models/auth/candidate.model';
import {ApiService} from '../../services/rest/api.service';
import {Company} from '../../models/auth/company.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginData} from '../../models/auth/login-data.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;

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
  public login(user: LoginData): Promise<string> {
    console.log('user: ', user);
    return new Promise((resolve, reject) => {
      this.apiService.post<LoginData>(this.api.login, user, this.httpOptions)
        .subscribe(
          (data) => {
            // console.log(data);
            const dataStr = JSON.stringify(data);
            localStorage.setItem('userLogin', dataStr);
            resolve('succsess');
          },
          (error: Error) => {
            console.log(error);
            reject(error);
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
