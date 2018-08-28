import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-title-page-header',
    templateUrl: './title-page-header.component.html',
    styleUrls: ['./title-page-header.component.scss']
})
export class TitlePageHeaderComponent implements OnInit {
  private routes = environment.routes;

    constructor(
        private modalService: ModalService,
    ) {
    }

    ngOnInit() {

    }

    openModal(link: string) {
        this.modalService.openModal(this.routes[link]);
    }
}
