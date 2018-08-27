import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCandidatesService {
  // TODO make inheritance of ApiService
  constructor(http: HttpClient, private apiService: ApiService) {
  }

  /**
   * makes request for candidates list from back-end server
   * @returns {Observable<Object>}
   */
  public getCandidates(): Observable<Object> {
    return this.apiService.get(['candidates']);
  }

  /**
   * makes request for candidate from Node.js middleware server
   * @returns {Observable<Object>}
   */
  public getCandidate(id: string): Observable<Object> {
    return this.apiService.get(['candidates', id]);
  }

  // /**
  //  * makes post request to the back-end server's create candidate method
  //  * and sends JSON with candidate data;
  //  * @param {Candidate} employee
  //  */
  // public createCandidate(candidate: Candidate) {
  //   this.apiService.post<Candidate>(['candidates'], candidate)
  //       .subscribe(
  //           (data) => {
  //             console.log(data);
  //           });
  // }
}
