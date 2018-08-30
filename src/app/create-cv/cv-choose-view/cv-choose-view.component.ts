import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-cv-choose-view',
  templateUrl: './cv-choose-view.component.html',
  styleUrls: ['./cv-choose-view.component.scss']
})
export class CvChooseViewComponent implements OnInit {
  templates = ['0', '1'];
  templateId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
  }

  onChangeTemplate(chosenTemplate) {
    this.router.navigate(['create-cv', chosenTemplate]);
    this.route.params.subscribe((params: Params) => {
      this.templateId = params.type;
      console.log(this.route);
    });
  }
}
