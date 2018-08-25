import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../employee.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCandidatesService {
  // TODO make inheritance of ApiService
  constructor(http: HttpClient, private apiService: ApiService) {
  }

  /**
   * makes request for candidates list from Node.js middleware server
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

  createEmployee(employee: Employee) {

    this.apiService.post<Employee>(['candidates'], employee)
        .subscribe(
            (data) => {
              console.log(data);
            });
  }
}
