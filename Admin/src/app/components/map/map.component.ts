import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker} from '@angular/google-maps';
import { MapService } from '../../service/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    standalone: true,
    imports: [GoogleMapsModule, MapAdvancedMarker]
})
export class MapComponent implements OnInit{
    maps = window.google.maps
    perizie:any = {}
    zoom = 10;
    center: google.maps.LatLngLiteral = {lat: 45.052237, lng: 7.515388};
    tilt: google.maps.CameraOptions = {heading: 0};
    options: google.maps.MapOptions = {
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 8,
        streetViewControl: false,
        fullscreenControl: false,
        scaleControl: true
    };
    markerOptions: google.maps.marker.AdvancedMarkerElementOptions= {
        gmpClickable: true,
        gmpDraggable: false,
        
    }

    opzioni:any[] = []
    
    PinElement:any 

    constructor(protected mapsService:MapService) {  }

    async ngOnInit(){
        this.perizie = await this.mapsService.getMarkers()
        console.info(this.perizie)
        this.PinElement = (await this.maps.importLibrary("marker") as google.maps.MarkerLibrary).PinElement;
        
        //console.log(this.opzioni.element)
        this.opzioni = this.perizie.map((elem:any)=>{
            return new this.PinElement({
                "background": "#353aba",
                "borderColor": "#f2f3f5",
                "glyphColor": "#f2f3f5",
                "scale": 1.2,
                "glyph": "📍",
            })
        })
    }

    dasdsad():any[]{
        return Array.from(this.perizie)
    }
}
