import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {Router} from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Input() state: string;
    @ViewChild('modal') modal: ElementRef;


    constructor(
        private router: Router,
        private modalService: ModalService
    ) {
    }

    ngOnInit() {
    }

    close(event, modal: ElementRef) {
        this.modalService.modalClosed.emit(false);
        if (event.target == modal) {
            this.router.navigate(['/']);
        }
    }

    openModal() {
        $('#modal-main').modal('show');
        this.modalService.modalClosed.emit(true);
    }
}
