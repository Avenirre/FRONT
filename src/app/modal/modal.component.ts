import {Component, OnInit, Input, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    isOpened = false;
    isOpenedChangedEvent: Event;

    constructor(
        private modalService: ModalService
    ) {
    }

    ngOnInit() {
        this.isOpenedChangedEvent = this.modalService.getModalChangedEmmiter()
            .subscribe(isOpened => this.isOpened = isOpened);
    }

    ngOnDestroy(): void {}

    public closeModal() {
        this.isOpened = false;
        this.modalService.closeModal();
    }

    public openModal() {
        this.isOpened = true;
    }


}
