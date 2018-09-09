import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {QueryAdressInterface} from '../../interfaces/query-adress.interface';
import {RequestAdress} from '../../models/request-adress.model';

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
  public get(path: string[], headers?) {
    const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
    const query = this.buildRequest(adr);
    console.log('Query(get) to: ' + query);
    console.log('Query(get) header: ', headers);
    if (headers) {
        return this.http.get(query, headers);
    } else {
        return this.http.get(query);
    }
  }

    /**
     * makes PUT request to the back-server with given params
     * @param path: string[]
     * @param obj: JSON object
     * @param httpOptions: JSON headers
     */
  public put<T>(path: string[], obj: T, httpOptions) {
      const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
      const query = this.buildRequest(adr);
      console.log('Query(put) to: ' + query);
      console.log('Query(put) header: ', httpOptions);
      console.log('Query(put) object:');
      console.log(obj);
      return this.http.put(query, obj, httpOptions);
  }

  public delete<T>(path: string[], httpOptions) {
      const adr = new RequestAdress(environment.apiUrl, environment.apiPort.toString(), path);
      const query = this.buildRequest(adr);
      console.log('Query(delete) to: ' + query);
      console.log('Query(delete) header: ', httpOptions);
      return this.http.delete(query, httpOptions);
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
    console.log('Query(post) to: ' + query);
    console.log('Query(post) header: ', httpOptions);
    console.log('Query(post) object:');
    console.log(obj);
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
