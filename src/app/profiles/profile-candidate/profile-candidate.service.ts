import {Injectable, OnInit} from '@angular/core';
import {CV} from '../../../models/cv/cv.model';
import {CvService} from '../../create-cv/cv.service';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../services/rest/api.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileCandidateService implements OnInit {
  private cvs: CV[];

  constructor(private cvService: CvService,
              private apiService: ApiService) {

  }

  ngOnInit(): void {

  }

}
