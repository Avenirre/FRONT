import {Injectable, EventEmitter, Output, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ModalService implements OnInit {
    @Output() modalStateChanged = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        location: PlatformLocation
    ) {
        location.onPopState(() => {
            this.modalStateChanged.emit(false);
        });
    }

    ngOnInit(): void {}

    getModalChangedEmmiter() {
        return this.modalStateChanged;
    }

    openModal(link: string) {
        this.router.navigate(['/', {outlets: {modal: [link]}}]);
        this.modalStateChanged.emit(true);
    }

    closeModal() {
        this.modalStateChanged.emit(false);
        this.router.navigate(['..', {outlets: {modal: null}}]);
    }
}
