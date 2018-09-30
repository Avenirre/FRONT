import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RenderService {
    removedSkill = new EventEmitter<any>();
    jobsFrontEndChange = new EventEmitter<any>();

    constructor() {
    }
}
