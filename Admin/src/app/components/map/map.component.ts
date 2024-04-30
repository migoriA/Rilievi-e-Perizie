import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker} from '@angular/google-maps';
import { MapService } from '../../service/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    standalone: true,
    imports: [GoogleMapsModule, MapAdvancedMarker]
})
export class MapComponent implements OnInit{
    constructor(protected mapsService:MapService, private route: ActivatedRoute) {  }
    value = this.route.snapshot.queryParams
    maps = window.google.maps
    perizie:any = {}
    zoom = 'lng' in this.value ? 15 : 10;
    center: google.maps.LatLngLiteral = 'lng' in this.value ? {lat:parseFloat(this.value['lat']),lng:parseFloat(this.value['lng'])} : {lat: 44.555302,lng: 7.7363457};
    options: google.maps.MapOptions = {
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        streetViewControl: false,
        fullscreenControl: false,
    };
    schoolMarker:any

    opzioni:any[] = []
    
    PinElement:any 

    async ngOnInit(){
        this.perizie = await this.mapsService.getMarkers()
        this.PinElement = (await this.maps.importLibrary("marker") as google.maps.MarkerLibrary).PinElement;
        this.schoolMarker = new this.PinElement({
            "background": "#353aba",
            "borderColor": "#f2f3f5",
            "glyphColor": "#f2f3f5",
            "scale": 1.2,
            "glyph": "🏫",
        })
        console.log(this.schoolMarker.element)
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

    //TODO: Implementare la funzione click sul marker che redirecta alla pag dettagli perizia
    //TODO: Sul click del pulsante mappa nella sezione dettagli perizia redirecta sulla mappa e crea il percorso della perizia
    //TODO: Implementare commenti della immagine e la possibilità di modificarli
}
