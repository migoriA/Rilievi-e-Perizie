import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapService } from '../../service/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    standalone: true,
    imports: [GoogleMapsModule]
})
export class MapComponent implements OnInit{
    perizie:any = {}
    zoom = 10;
    center: google.maps.LatLngLiteral = {lat: 45.052237, lng: 7.515388};
    tilt: google.maps.CameraOptions = {heading: 0};
    options: google.maps.MapOptions = {
        mapTypeId: 'hybrid',
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        maxZoom: 20,
        minZoom: 8,
        heading: 90,
        tilt: 45,

    };
    

    constructor(protected mapsService:MapService) {  }

    ngOnInit(){
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.center = {
        //         lat: position.coords.latitude, lng: position.coords.longitude
        //     };
        //     //console.log(this.center)
        // });
        
    
    
        this.mapsService.getMarkers()
    }
}
