import {Component, OnInit} from '@angular/core';
import {ApiCandidatesService} from '../../services/rest/api-candidates.service';
import {ApiCompaniesService} from '../../services/rest/api-companies.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  chips: { id: string, value: string }[] = [
    {id: 'jerusalem', value: 'Jerusalem District'},
    {id: 'nothern', value: 'Nothern District'},
    {id: 'haifa', value: 'Haifa District'},
    {id: 'central', value: 'Central District'},
    {id: 'central', value: 'Central District'},
    {id: 'telaviv', value: 'Tel Aviv District'},
    {id: 'southern', value: 'Southern District'},
  ];

  constructor(
    private apiCandidatesService: ApiCandidatesService,
    private apiCompaniesService: ApiCompaniesService
  ) {
  }

  ngOnInit() {
    this.testChips();
  }

  testChips() {
  }
}
