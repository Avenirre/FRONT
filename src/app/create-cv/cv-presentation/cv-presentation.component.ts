import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import { CV } from '../../../models/cv.model';

@Component({
  selector: 'app-cv-presentation',
  templateUrl: './cv-presentation.component.html',
  styleUrls: ['./cv-presentation.component.scss']
})
export class CvPresentationComponent implements OnInit {
  cv: CV;
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.cv = this.cvService.getCv();
    this.cvService.cvChanged.subscribe(
        (cv) => {
            this.cv = this.cvService.getCv();
        }
    );
  }

}
