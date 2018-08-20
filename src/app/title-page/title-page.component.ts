import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-title-page',
    templateUrl: './title-page.component.html',
    styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {
    isBlur = false;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.isBlur = params.modal;
        });
    }
}
