import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  container;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  getCandidates() {
    this.apiService.getCandidates().subscribe(
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
    this.apiService.getCompanies().subscribe(
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
    this.apiService.getCandidate(id).subscribe(
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
