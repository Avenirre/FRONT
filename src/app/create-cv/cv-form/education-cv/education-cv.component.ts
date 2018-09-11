import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {ViewChild, ElementRef, NgZone, OnInit, Component} from '@angular/core';

@Component({
    selector: "education-cv",
    templateUrl: './education-cv.component.html',
    styleUrls: ['./education-cv.component.scss']
})
export class EducationCvComponent implements OnInit {

    @ViewChild('search') public searchElement: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

    ngOnInit() {
        this.mapsAPILoader.load().then(
            () => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['establishment'] });

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
