import {Component, OnInit} from '@angular/core';
import {routes} from '../../environments/environment.fake-roots';
import {ModalService} from '../modal/modal.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private modalService: ModalService) {}

    ngOnInit() {
    }

    openModal(link: string) {
        console.log(routes[link]);
        this.modalService.openModal(routes[link]);
    }
}
