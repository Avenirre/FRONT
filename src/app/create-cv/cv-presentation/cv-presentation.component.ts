import {Component, OnDestroy, OnInit} from '@angular/core';
import {CvService} from '../cv.service';
import {CV} from '../../../models/cv/cv.model';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-cv-presentation',
  templateUrl: './cv-presentation.component.html',
  styleUrls: ['./cv-presentation.component.scss']
})
export class CvPresentationComponent implements OnInit, OnDestroy {
  cv: CV;
  templateType = 0;
  templateColor = 0;

  constructor(
    private cvService: CvService
  ) {
  }

  ngOnInit() {
    this.cv = this.cvService.getCV();
    this.loadTemplate();

    this.cvService.cvChanged.subscribe(
      (cv: CV) => {
        this.cv = cv;
        this.loadTemplate();
      }
    );
  }

  loadTemplate() {
    if (this.cv.template) {
      this.templateType = this.cv.template.type;
      this.templateColor = this.cv.template.colorScheme;
    }
  }

  ngOnDestroy(): void {

  }
}
