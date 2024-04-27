import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../service/list.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  id:any
  name:string = ''
  data:any
  ora:any
  indirizzo:any
  google = window.google
  constructor(private route: ActivatedRoute, private router: Router, protected listService: ListService) {}

  async ngOnInit() {
    this.id = this.route.queryParams;
    this.name = this.route.snapshot.queryParams['list'];
    await this.listService.getDetails(this.id._value.id)
    console.log(this.name)  
    console.log(this.listService.user)
    this.data = this.listService.user.time.split('T')[0]
    this.data = this.data.split('-').reverse().join('/')
    this.ora = this.listService.user.time.split('T')[1]
    this.ora = this.ora.split(':')[0] + ':' + this.ora.split(':')[1]

    let geocoder = new this.google.maps.Geocoder()
    let latlng = {lat: parseFloat(this.listService.user.coor.split(',')[0]), lng: parseFloat(this.listService.user.coor.split(',')[1])}
    geocoder.geocode({'location': latlng}, (results: any, status:string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.indirizzo = results[0].formatted_address.split(',')[0]+ ', ' + results[0].formatted_address.split(',')[1]
          console.log(results[0].formatted_address)
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    })
  }
}
