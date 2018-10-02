import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CV} from '../../../../../models/cv/cv.model';
import {CvService} from '../../../../../services/cv.service';
import {forEach} from '../../../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.scss']
})
export class CvItemComponent implements OnInit {
  @Input() cv: CV;
  @ViewChild('ch') ch: ElementRef;
  badgeClasses = {
      'badge': true,
      'badge-secondary': false,
      'badge-primary': false
  };
  badgeText = 'Not activated';
  constructor(private cvService: CvService) { }

  ngOnInit() {
      this.cvService.changedUserCvsLocal.subscribe(
          (CVs) => {
              for (let i = 0; i < CVs.length; i++) {
                  if (CVs[i].id === this.cv.id) {
                     this.cv = CVs[i];
                     this.ch.nativeElement.checked = false;
                     this.fillBadge();
                  }
              }
          }
      );
      this.fillBadge();
  }

  fillBadge() {
    this.badgeClasses['badge-secondary'] = !this.cv.activated;
    this.badgeClasses['badge-primary'] = this.cv.activated;
    if (this.cv.activated) {
        this.badgeText = 'Activated';
    } else {
        this.badgeText = 'Not activated';
    }
  }

  checkCv(event, id) {
    if (event.target.checked) {
        this.cvService.userCvsIdChecked.push(id);
    } else {
        const index = this.cvService.userCvsIdChecked.indexOf(id);
        this.cvService.userCvsIdChecked.splice(index, 1);
    }
    this.cvService.changedChecked.next(this.cvService.userCvsIdChecked.length);
  }

}
