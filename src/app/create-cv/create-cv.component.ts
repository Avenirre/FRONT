import { Component, OnInit } from '@angular/core';
import {CvService} from '../../services/cv.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CV} from '../../models/cv/cv.model';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.scss']
})
export class CreateCvComponent implements OnInit {


  constructor(private cvService: CvService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          if (params['id']) {
            this.cvService.setCVOfUserCvs(params['id']);
          } else {
              DataService.saveCV(new CV());
              this.cvService.setCV(new CV());
          }
        }
    );
  }

}
