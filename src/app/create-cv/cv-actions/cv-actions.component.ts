import { Component, OnInit } from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-cv-actions',
  templateUrl: './cv-actions.component.html',
  styleUrls: ['./cv-actions.component.scss']
})
export class CvActionsComponent implements OnInit {
  title: string;
  cv: CV;
  onlyShowMode = true;
  url_share: string;
  constructor(private cvService: CvService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.cvService.setCV().title;
    this.onlyShowMode = this.cvService.onlyShowMode;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.title = cv.title;
      this.onlyShowMode = this.cvService.onlyShowMode;
    });
    this.route.params.subscribe(
        (params) => {
          this.url_share = environment.apiUrl + ':' + environment.apiPort + '/cv/' + params['id'];
        }
    );
  }

    activateCv() {
        this.cvService.setCV().activated = true;
        this.saveCv();
    }

    saveCv() {
        this.cv = this.cvService.setCV();
        this.cvService.saveCV();
    }

    copyLink() {
      console.log(this.url_share);
    }
}
