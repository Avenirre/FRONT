import {Component, OnInit} from '@angular/core';
import {ApiCandidatesService} from '../../services/rest/api-candidates.service';
import {ApiCompaniesService} from '../../services/rest/api-companies.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  container;

  constructor(
      private apiCandidatesService: ApiCandidatesService,
      private apiCompaniesService: ApiCompaniesService
      ) {
  }

  ngOnInit() {
  }

  getCandidates() {
    this.apiCandidatesService.getCandidates().subscribe(
       (data) => {
         // console.log(data);
         this.container = data;
       },
       (error) => {
         // console.log(error);
         this.container = error;
       }
    );
  }

  getCompanies() {
    this.apiCompaniesService.getCompanies().subscribe(
       (data) => {
         // console.log(data);
         this.container = data;
       },
       (error) => {
         // console.log(error);
         this.container = error;
       }
    );
  }

  getCandidate(id: string) {
    this.apiCandidatesService.getCandidate(id).subscribe(
       (data) => {
         // console.log(data);
         this.container = data;
       },
       (error) => {
         // console.log(error);
         this.container = error;
       }
    );
  }
}
