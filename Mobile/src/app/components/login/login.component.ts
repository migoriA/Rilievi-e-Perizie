import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,ReactiveFormsModule,} from '@angular/forms';
import {IonApp,IonRouterOutlet,IonContent,IonCard,IonItem,IonInput,IonButton,IonCardHeader,IonCardContent,IonCardTitle,IonLabel,IonHeader,IonToolbar,IonTitle,} from '@ionic/angular/standalone';
import { LoginService } from 'src/app/service/login.service';

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
  constructor(private loginService:LoginService) {}

  ngOnInit() {}

  onLogIn(){
    this.loginService.login(this.form.controls['username'].value, this.form.controls['password'].value)
  }
}
