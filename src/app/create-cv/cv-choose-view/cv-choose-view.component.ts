import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CvService} from '../../../services/cv.service';


@Component({
  selector: 'app-cv-choose-view',
  templateUrl: './cv-choose-view.component.html',
  styleUrls: ['./cv-choose-view.component.scss']
})
export class CvChooseViewComponent implements OnInit {
  templates = environment.settings.templates;
  templateId: number;

  constructor(
    private cvService: CvService
  ) {
  }

  ngOnInit() {
    this.cvService.setCV();
  }

  onChangeTemplate(type, color) {
    this.cvService.setTemplate({
      templateType: type,
      templateColor: color
    });
  }
}
