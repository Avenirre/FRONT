import { Component, OnInit } from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import { ClipboardService } from 'ngx-clipboard'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-cv-actions',
  templateUrl: './cv-actions.component.html',
  styleUrls: ['./cv-actions.component.scss']
})
export class CvActionsComponent implements OnInit {
  cv: CV;
  onlyShowMode = true;
  url_share: string;
  alertClass = [];
  alertText = '';
  alertVisible = false;
  formValid = false;
  activatedField: string;

  constructor(private cvService: CvService,
              private route: ActivatedRoute,
              private _clipboardService: ClipboardService) { }

  ngOnInit() {
    this.onlyShowMode = this.cvService.onlyShowMode;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.cv = cv;
      this.onlyShowMode = this.cvService.onlyShowMode;
    });
    this.cvService.changedForm.subscribe(
        (form: NgForm) => {
            this.formValid = form.valid;
        }
    );
    this.cvService.lightPresentationField.subscribe(
        (field) => {
            this.activatedField = field;
        }
    );
    this.route.params.subscribe(
        (params) => {
          if (params['id']) {
             this.alertClass = ['text-success'];
             this.url_share = environment.apiUrl + ':' + environment.apiPort + '/cv/' + params['id'];
             this.alertText = `Link on this CV: <a link='${this.url_share}'>${this.url_share}</a>, was copied to the clipboard.`;
             document.execCommand('copy');
          } else {
             this.alertClass = ['text-danger'];
             this.alertText = 'This CV cant`t be shared. Please save this CV before sharing.';
          }
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
        if (this.url_share) {
            this._clipboardService.copyFromContent(this.url_share);
        }
        this.alertVisible = true;
    }
}
