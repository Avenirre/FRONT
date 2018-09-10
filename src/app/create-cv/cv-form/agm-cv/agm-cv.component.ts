import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {ViewChild, ElementRef, NgZone, OnInit, Component} from '@angular/core';

@Component({
    selector: "agm-cv",
    templateUrl: './agm-cv.component.html',
    styleUrls: ['./agm-cv.component.scss']
})
export class AgmCvComponent implements OnInit {

    @ViewChild('search') public searchElement: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

    ngOnInit() {
        this.mapsAPILoader.load().then(
            () => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["(cities)"] });

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        if (place.geometry === undefined || place.geometry === null ) {
                            return;
                        }
                    });
                });
            }
        );
    }

}
