import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Company} from '../support/company.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCompaniesService {

  constructor(
      private apiService: ApiService
      ) {
  }

  /**
   * makes request for companies list from Node.js middleware server
   * @returns {Observable<Object>}
   */
  public getCompanies() {
    return this.apiService.get(['companies']);
  }

  public createCompany(company: Company) {
    this.apiService.post<Company>(['companies'], company)
      .subscribe(
        (data) => {
          console.log(data);
        });
  }
}
