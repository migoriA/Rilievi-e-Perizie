import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,ReactiveFormsModule,} from '@angular/forms';
import {IonApp,IonRouterOutlet,IonContent,IonCard,IonItem,IonInput,IonButton,IonCardHeader,IonCardContent,IonCardTitle,IonLabel,IonHeader,IonToolbar,IonTitle,} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonButton,
    IonInput,
    IonItem,
    IonCard,
    IonContent,
    IonApp,
    IonRouterOutlet,
    ReactiveFormsModule
  ],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit() {}

  onLogIn(){
    console.log(this.form.controls['username'].value);
  }
}
