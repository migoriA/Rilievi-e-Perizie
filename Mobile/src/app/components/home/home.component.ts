import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonText } from "@ionic/angular/standalone";
import { HomeService } from 'src/app/service/home.service';
import { GoogleMap, GoogleMapsModule} from '@angular/google-maps';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, GoogleMapsModule]
})
export class HomeComponent  implements OnInit {
  date:any = []
  time:any = []
  geocoder:any
  indirizzi:any = []
  constructor(protected homeService:HomeService,private logInService:LoginService) { 
    this.geocoder = new google.maps.Geocoder()
  }

  async ngOnInit() {
    let user = this.logInService.user != undefined ? this.logInService.user : JSON.parse(localStorage.getItem('user')!)
    await this.homeService.getUserInfo(user)
    console.log(this.homeService.perizie)
    this.homeService.perizie.map((perizia:any) => {
      this.date.push(perizia.time.split('T')[0].split('-').reverse().join('/'))
      this.time.push(perizia.time.split('T')[1])

      let latlng = {lat: parseFloat(perizia.coor.split(',')[0]), lng: parseFloat(perizia.coor.split(',')[1])}
      this.geocoder.geocode({'location':latlng},(results:any,status:any)=>{
        if(status === 'OK'){
          if(results[0]){ 
            this.indirizzi.push(results[0].formatted_address)
          }else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      })
    })
  }

}
