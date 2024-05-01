import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,ReactiveFormsModule,} from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor(private loginService:LoginService, private router:Router) {}

  ngOnInit() {}

  onLogIn(){
    this.loginService.login(this.form.controls['username'].value, this.form.controls['password'].value).then(response => {
      this.loginService.user = response.data
      console.log(this.loginService.user)
      localStorage.setItem('user',JSON.stringify(this.loginService.user))
      this.router.navigate(['/tabs/tab2'])
    })
    .catch(err=>{
      console.log(err)
    })
  }
  onPassword(){
    this.router.navigate(['/tabs/password'])
  }
}