import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {routes} from '../../../environments/environment.fake-roots';
import {Router} from '@angular/router';

@Component({
    selector: 'app-title-page-header',
    templateUrl: './title-page-header.component.html',
    styleUrls: ['./title-page-header.component.scss']
})
export class TitlePageHeaderComponent implements OnInit {
    constructor(
        private modalService: ModalService,
    ) {
    }

    ngOnInit() {

    }

    openModal(link: string) {
        this.modalService.openModal(routes[link]);
        // this.router.navigate(['/' + routes[link], {modal: true}]);
    }
}
