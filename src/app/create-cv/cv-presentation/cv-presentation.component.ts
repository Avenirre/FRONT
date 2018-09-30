import {Component, OnDestroy, OnInit} from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {RenderService} from '../../../services/render.service';

@Component({
  selector: 'app-cv-presentation',
  templateUrl: './cv-presentation.component.html',
  styleUrls: ['./cv-presentation.component.scss']
})
export class CvPresentationComponent implements OnInit, OnDestroy {
  cv: CV;
  templateType = 0;
  templateColor = 0;
  activatedField: string;
  jobsFrontEnd: boolean[] = [];

  constructor(
    private cvService: CvService,
    private renderService: RenderService) {
  }

  ngOnInit() {
    this.cv = this.cvService.setCV();
    this.loadTemplate();

    this.renderService.jobsFrontEndChange.subscribe(
        (obj) => {
          this.jobsFrontEnd[obj.id] = obj.value;
        }
    );
    this.cvService.cvChanged.subscribe(
      (cv: CV) => {
        this.cv = cv;
        this.loadTemplate();
      }
    );
    this.cvService.lightPresentationField.subscribe(
        (field) => {
            this.activatedField = field;
        }
    );
  }

  loadTemplate() {
    if (this.cv.template) {
      this.templateType = this.cv.template.type;
      this.templateColor = this.cv.template.colorScheme;
    }
  }

  calculateAge(birthday) {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) || null;
  }

  ngOnDestroy(): void {

  }
}
