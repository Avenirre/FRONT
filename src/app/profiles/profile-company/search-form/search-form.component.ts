import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  profile;
  profAreas: { value: string, displayValue: string }[] = [
    {value: 'backend', displayValue: 'Backend'},
    {value: 'frontend', displayValue: 'Frontend'},
    {value: 'fullstack', displayValue: 'Full stack'},
  ];

  skills: { id: number, value: string }[] = [
    {id: 1, value: 'some skill1'},
    {id: 2, value: 'another skill2'},
    {id: 3, value: 'skill3'},
    {id: 4, value: 'some great skill4'},
    {id: 4, value: 'skill5'},
  ];

  regions: { value: string, displayValue: string }[] = [
    {value: 'jerusalem', displayValue: 'Jerusalem District'},
    {value: 'nothern', displayValue: 'Nothern District'},
    {value: 'haifa', displayValue: 'Haifa District'},
    {value: 'central', displayValue: 'Central District'},
    {value: 'central', displayValue: 'Central District'},
    {value: 'telaviv', displayValue: 'Tel Aviv District'},
    {value: 'southern', displayValue: 'Southern District'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onSubmitForm(searchForm: HTMLFormElement) {

  }

  replaceSkills(skills: { id: number, value: string }[]) {
    this.skills = skills;
  }

  onAddSkill(skill: string) {
    const id = this.findNewId(this.skills);
    this.skills.push({id: id, value: skill});
  }

  private findNewId(list: { id: number; value: string }[]) {
    let id = 0;
    list.forEach((c) => {
      if (c.id > id) {
        id = c.id;
      }
    });
    return id;
  }
}

enum ActionUnit {
  NONE, ADD_SKILL
}
