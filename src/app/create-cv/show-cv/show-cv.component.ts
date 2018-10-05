import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CvService} from '../../../services/cv.service';

@Component({
  selector: 'app-show-cv',
  templateUrl: './show-cv.component.html',
  styleUrls: ['./show-cv.component.scss']
})
export class ShowCvComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private cvService: CvService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.cvService.setCV(+params['id']);
        }
    );
  }

}
