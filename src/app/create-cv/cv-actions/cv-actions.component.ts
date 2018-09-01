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
  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.title = this.cvService.getCV().settings.title;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.title = cv.settings.title;
    });
  }

}
