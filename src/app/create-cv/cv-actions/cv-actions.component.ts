import { Component, OnInit } from '@angular/core';
import {CvService} from '../cv.service';
import {CV} from '../../../models/cv.model';

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
    this.title = this.cvService.getCV().title;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.title = cv.title;
    });
  }

    activateCv() {
        this.cvService.getCV().activated = true;
        this.saveCv();
    }

    saveCv() {
        this.cv = this.cvService.getCV();
        this.cvService.saveCV(this.cv);
    }
}
