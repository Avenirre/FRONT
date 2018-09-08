import { Component, OnInit } from '@angular/core';
import {CvService} from './cv.service';
import {ActivatedRoute, Params} from '@angular/router';

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
            this.cvService.setEditCv(params['id']);
            console.log('id of editint cv is: ' + params['id']);
          }
        }
    );
  }

}
