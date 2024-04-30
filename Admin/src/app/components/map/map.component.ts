import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow, MapMarker} from '@angular/google-maps';
import { MapService } from '../../service/map.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    standalone: true,
    imports: [GoogleMapsModule, MapAdvancedMarker]
})
export class MapComponent implements OnInit{
    constructor(protected mapsService:MapService, private route: ActivatedRoute, private router:Router) {  }
    @ViewChild('map') map:any
    value = this.route.snapshot.queryParams
    maps:any = window.google.maps
    perizie:any = {}
    zoom = 10;
    center: google.maps.LatLngLiteral = {lat: 44.555302,lng: 7.7363457};
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
    infoContent:any = ""

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
        this.opzioni = this.perizie.map((elem:any)=>{
            return new this.PinElement({
                "background": "#353aba",
                "borderColor": "#f2f3f5",
                "glyphColor": "#f2f3f5",
                "scale": 1.2,
                "glyph": "📍",
            })
        })

        if('lng' in this.value){
            this.getDirections(this.value['lat'],this.value['lng'])
        }
    }
    latLng:any
    async getDirections(lat:any,lng:any) {
        const destination = { lat: parseFloat(lat), lng: parseFloat(lng) };
        const directionsService = new this.maps.DirectionsService()
        const directionsRenderer = new this.maps.DirectionsRenderer()
        
        this.latLng = destination
        this.map.panTo(destination);
        directionsRenderer.setMap(null);
        directionsRenderer.setMap(this.map.googleMap!);
        directionsRenderer.setPanel(null);
    
        const request: google.maps.DirectionsRequest = {
          origin: {lat: 44.555302,lng: 7.7363457},
          destination: destination,
          travelMode: this.maps.TravelMode.DRIVING, // BICYCLING, DRIVING, TRANSIT, WALKING
          provideRouteAlternatives: true
        };
    
        directionsService.route(request, (result:any, status:any) => {
            if (status === this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                this.infoContent = result.routes[0].legs[0].distance.text + ' - ' + result.routes[0].legs[0].duration.text
            } else {
                console.error('Errore durante il calcolo del percorso:', status);
            }
        });
    }
    dasdsad():any[]{
        console.log(this.perizie)
        return Array.from(this.perizie)
    }

    onMarkerClick($event: google.maps.MapMouseEvent,_t6: any) {
        let markerPos = {
            lat: $event.latLng!.lat(),
            lng: $event!.latLng!.lng()
        }
        console.log(_t6._id)
        if(JSON.stringify(markerPos) == JSON.stringify(this.latLng)){
            Swal.fire({
                title: "Tempo stimato",
                text: this.infoContent,
                confirmButtonText: "Chiudi",
            }).then((result) => {
                if(result.isConfirmed){
                    this.router.navigate(['/home/details'], {queryParams: {id: _t6['_id']}});
                }
            })
        }
        if(!('lng' in this.value)){
            this.router.navigate(['/home/details'], {queryParams: {id: _t6['_id']}});
        }
    }

    //TODO: Implementare commenti della immagine e la possibilità di modificarli
}
