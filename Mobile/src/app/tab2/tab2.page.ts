import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons} from '@ionic/angular/standalone';
import { HomeComponent } from '../components/home/home.component';
import { addIcons } from 'ionicons';
import {addCircle} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent,HomeComponent]
})
export class Tab2Page {

  constructor(protected router:Router) {
    addIcons({ addCircle });
  }
  onClick(){
    this.router.navigate(['/tabs/add'])
  }
}
