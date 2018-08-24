import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

@Component({
    selector: 'app-modal-employee-registration',
    templateUrl: './modal-employee-registration.component.html',
    styleUrls: [
        '../modal-content.component.scss',
        './modal-employee-registration.component.scss'
    ]
})
export class ModalEmployeeRegistrationComponent implements OnInit {

    constructor(
        private modalService: ModalService,
        private router: Router
    ) {}

    ngOnInit() {
    }

    openModal(link: string) {
        this.modalService.openModal(routes[link]);
    }

    submitRegistration() {
        this.modalService.closeModal();
        this.router.navigate(['/profile']);
    }
}
