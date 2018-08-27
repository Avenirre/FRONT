import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {QueryAdressInterface} from '../../interfaces/query-adress.interface';
import {RequestAdress} from '../support/request-adress.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // httpOptions = {
  //   // TODO token
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'my-auth-token'
  //   })
  // };
  constructor(private http: HttpClient) {
  }

  /**
   * makes request to the back-end server with given path
   * @param {string[]} path
   * @returns {Observable<Object>}
   */
  public get(path: string[]) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query to: ' + query);
    return this.http.get(query);
  }

  /**
   * makes post request to the back-end server with given path
   * and send data, stored in the @object
   * @param {string[]} path
   * @returns {Observable<Object>}
   */
  public post<T>(path: string[], obj: T, httpOptions) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    // console.log('Query to: ' + query);
    return this.http.post(query, obj, httpOptions);
  }
  /**
   *
   * @param {QueryAdressInterface} adr
   * @returns {string}
   */
  private buildRequest(adr: QueryAdressInterface): string {
    let res = adr.host + ':' + adr.port;
    adr.path.forEach(
       (section) => {
         res += '/' + section;
       }
    );
    return res;
  }
}
