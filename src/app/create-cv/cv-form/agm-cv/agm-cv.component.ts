import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {ViewChild, ElementRef, NgZone, OnInit, Component, Input} from '@angular/core';
import {CvService} from '../../../../services/cv.service';

@Component({
    selector: 'app-agm-cv',
    templateUrl: './agm-cv.component.html',
    styleUrls: ['./agm-cv.component.scss']
})
export class AgmCvComponent implements OnInit {
    @Input('id') id;
    @ViewChild('search') public searchElement: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private cvService: CvService) {}

    ngOnInit() {
        this.mapsAPILoader.load().then(
            () => {
                const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:['establishment'] });

                autocomplete.addListener('place_changed', () => {
                    this.ngZone.run(() => {
                        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        if (place.geometry === undefined || place.geometry === null ) {
                            return;
                        }
                        let formated_res = place.name;
                        for (let i = place.address_components.length - 1; i >= 0; i--) {
                            if (place.address_components[i].types.indexOf('locality') >= 0 ||
                                place.address_components[i].types.indexOf('country') >= 0) {
                                formated_res += ', ' + place.address_components[i].long_name;
                            }
                        }
                        this.cvService.cv.education[this.id].institution = formated_res;
                    });
                });
            }
        );
    }

}
