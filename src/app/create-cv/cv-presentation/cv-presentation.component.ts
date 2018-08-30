import {Component, OnDestroy, OnInit} from '@angular/core';
import {CvService} from '../cv.service';
import {CV} from '../../../models/cv.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-cv-presentation',
  templateUrl: './cv-presentation.component.html',
  styleUrls: ['./cv-presentation.component.scss']
})
export class CvPresentationComponent implements OnInit, OnDestroy {
  cv: CV;
  template: number;

  constructor(
    private cvService: CvService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.cv = this.cvService.getCv();
    this.cvService.cvChanged.subscribe(
      (cv) => {
        this.cv = this.cvService.getCv();
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.template = params.type;
    });
  }

  ngOnDestroy(): void {

  }
}
