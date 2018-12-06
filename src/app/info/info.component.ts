import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

declare var google;

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    map;

    constructor(public user: UserService) { }

    ngOnInit() {
        if (this.user.user.wedding_address != '') {
            setTimeout(() => {
                this.loadMap();
            }, 1)
        }
    }

    loadMap() {
        let geocoder = new google.maps.Geocoder();
        // let address = document.getElementById('address').value; //input box value
        geocoder.geocode({ 'address': localStorage.getItem('wedding_address') },
            (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    this.map = new google.maps.Map(document.getElementById('map'), { zoom: 16 });
                    this.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: this.map,
                        position: results[0].geometry.location
                    });
                }
            });
    }

}
