import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {QueryAdressInterface} from '../interfaces/QueryAdress.interface';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * makes request for candidates list from Node.js middleware server
   * @returns {Observable<Object>}
   */
  public getCandidates(): Observable<Object> {
    return this.makeServerQuery(['candidates']);
  }

  /**
   * makes request for candidate from Node.js middleware server
   * @returns {Observable<Object>}
   */
  public getCandidate(id: string): Observable<Object> {
    return this.makeServerQuery(['candidates', id]);
  }

  /**
   * makes request for companies list from Node.js middleware server
   * @returns {Observable<Object>}
   */
  getCompanies() {
    return this.makeServerQuery(['companies']);
  }

  /**
   * makes request to the Node.js server with given path
   * @param {string[]} path
   * @returns {Observable<Object>}
   */
  makeServerQuery(path: string[]) {
    const adr: QueryAdressInterface = {
      host: environment.apiUrl,
      port: '' + environment.apiPort,
      path: path
    };
    const query = this.makeRequest(adr);
    console.log('Query to: ' + query);
    return this.http.get(query);
  }
  /**
   *
   * @param {{host: string; port: string}} adr
   * @param {string[]} path
   * @returns {string}
   */
  private makeRequest(adr: QueryAdressInterface): string {
    let res = adr.host + ':' + adr.port;
    adr.path.forEach(
       (section) => {
         res += '/' + section;
       }
    );
    return res;
  }
}
