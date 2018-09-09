import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../../../models/cv/cv.model';
import {CvService} from '../../../../../services/cv.service';

@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.scss']
})
export class CvItemComponent implements OnInit {
  @Input() cv: CV;
  badgeClasses = ['badge', 'badge-secondary'];;
  badgeText = 'Not activated';
  constructor(private cvService: CvService) { }

  ngOnInit() {
      this.fillBadge();
  }

  fillBadge() {
    if (this.cv.activated) {
        this.badgeClasses = ['badge', 'badge-primary'];
        this.badgeText = 'Activated';
    } else {
        this.badgeClasses = ['badge', 'badge-secondary'];
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
