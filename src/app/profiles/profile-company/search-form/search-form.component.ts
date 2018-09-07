import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../services/rest/api.service';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  profile;

  constructor() { }

  ngOnInit() { }

  onSubmitForm(searchForm: HTMLFormElement) {
    
  }


}
