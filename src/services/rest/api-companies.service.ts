import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

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
  getCompanies() {
    return this.apiService.get(['companies']);
  }
}
