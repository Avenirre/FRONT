import { Component, OnInit } from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';

@Component({
  selector: 'app-cv-actions',
  templateUrl: './cv-actions.component.html',
  styleUrls: ['./cv-actions.component.scss']
})
export class CvActionsComponent implements OnInit {
  title: string;
  cv: CV;
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.title = this.cvService.setCV().title;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.title = cv.title;
    });
  }

    activateCv() {
        this.cvService.setCV().activated = true;
        this.saveCv();
    }

    saveCv() {
        this.cv = this.cvService.setCV();
        this.cvService.saveCV();
    }
}
