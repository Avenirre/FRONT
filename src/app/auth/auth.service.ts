import {Injectable} from '@angular/core';
import {Applicant} from '../../models/auth/applicant.model';
import {ApiService} from '../../services/rest/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginData} from '../../models/auth/login-data.model';
import {environment} from '../../environments/environment';
import {ModalService} from '../modal/modal.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {LocalProfile} from '../../models/local-storage/local-profile.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DataService.getUserToken()}`,
    })
  };

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private apiService: ApiService,
    private router: Router,
    private dataService: DataService,
  ) {
  }

// LIFETIME METHODS

  /**
   * check if user logged in
   * @returns {boolean}
   */
  public static isLoggedIn(): boolean {
    const user = DataService.getCurrentUser();

    return user !== null && user.token !== null;
  }

  public static isUserAlive(): boolean {
    const profileTime = DataService.getCurrentUser().timestamp;
    const currentTime = Date.now();
    const lifeTime = DataService.toMilliseconds(environment.settings.profileLifetime);
    return currentTime - profileTime < lifeTime;
  }

  public handleSession() {
    if (!AuthService.isUserAlive()) {
      this.logout();
      throw Error('unauthorized user: session is expired');
    }
  }

// END LIFETIME METHODS

  /**
   * login user with given login data
   */
  public login(user: LoginData): Promise<string> {
    return new Promise((resolve, reject) => {
      this.apiService.post<LoginData>(this.api.login, user, this.httpOptions)
        .subscribe(
          (data) => {
            this.afterSuccessLogin(data);
            console.log(data);
            resolve('success');
          },
          (error: Error) => {
            this.afterFailedLogin(error);
            reject(error);
          });
    });
  }

  /**
   * fulfills after success user login;
   * @param data
   */
  private afterSuccessLogin(response) {
    // console.log('log s: ', response.data);
    DataService.saveUser(response.data);
    this.modalService.showSuccessLogin();
  }

  /**
   *fulfills after failed user login;
   */
  private afterFailedLogin(error) {
    console.log('login error: ', error);
  }

  /**
   *logout current user
   */
  public logout(): boolean {
    if (AuthService.isLoggedIn()) {
      DataService.removeUser();
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  /**
   * makes post request to the back-end server's create candidate method
   * and sends JSON with candidate data;
   * @param {Candidate} employee
   */
  public createApplicant(applicant: Applicant) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise((resolve, reject) => {
      this.apiService.post<Applicant>(this.api.registration, applicant, httpOptions)
        .subscribe(
          (response) => {
            // console.log('success reg', data);
            if (response['status'] === 'success') {
              resolve(response['data']);
            } else {
              reject(response['status']);
            }
          },
          (error) => {
            // console.log('error reg', error);
            reject(error);
          });
    });
  }


}




