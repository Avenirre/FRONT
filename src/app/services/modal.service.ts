import {Injectable, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    @Output() modalStateChanged = new EventEmitter<string>();
    @Output() modalClosed = new EventEmitter<boolean>();

    constructor(private router: Router) {
    }

    openModal(link: string) {
        this.router.navigate(['/' + link], {queryParams: {modal: true}});
    }
}
