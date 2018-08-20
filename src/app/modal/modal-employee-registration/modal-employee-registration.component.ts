import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {Router} from '@angular/router';
import {routes} from '../../../environments/environment.fake-roots';

@Component({
    selector: 'app-modal-employee-registration',
    templateUrl: './modal-employee-registration.component.html',
    styleUrls: ['./modal-employee-registration.component.scss']
})
export class ModalEmployeeRegistrationComponent implements OnInit {

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
        this.router.navigate(['/profile']);
    }
}
