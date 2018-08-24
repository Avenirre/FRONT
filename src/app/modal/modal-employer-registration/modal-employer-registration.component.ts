import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

@Component({
    selector: 'app-modal-employer-registration',
    templateUrl: './modal-employer-registration.component.html',
    styleUrls: [
        '../modal-content.component.scss',
        './modal-employer-registration.component.scss'
    ]
})
export class ModalEmployerRegistrationComponent implements OnInit {

    constructor(
        private modalService: ModalService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    openModal(link: string) {
        this.modalService.openModal(routes[link]);
        // this.router.navigate(['/' + routes[link]]);
    }

    submitRegistration() {
        this.modalService.closeModal();
        this.router.navigate(['/profile']);
    }
}
