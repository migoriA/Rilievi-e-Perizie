import { Component, OnInit } from '@angular/core';
import {IonApp,IonRouterOutlet,IonContent,IonCard,IonItem,IonInput,IonButton,IonCardHeader,IonCardContent,IonCardTitle,IonLabel,IonHeader,IonToolbar,IonTitle} from '@ionic/angular/standalone';
import {FormControl,FormGroup,Validators,ReactiveFormsModule,} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  standalone: true,
  imports: [IonApp,IonRouterOutlet,IonContent,IonCard,IonItem,IonInput,IonButton,IonCardHeader,IonCardContent,IonCardTitle,IonLabel,IonHeader,IonToolbar,IonTitle,ReactiveFormsModule]
})
export class PasswordComponent  implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
  });
  constructor(private loginService:LoginService,private alertController:AlertController) { }

  ngOnInit() {}

  onClick(){
    this.loginService.requestPassword(this.form.controls['username'].value).then(response => {
      console.log(response)
      this.alertController.create({
        header: 'Success',
        message: 'Password reset link sent to your email',
        buttons: ['OK']
      }).then(alert => {
        alert.present().then(()=>{
          window.location.href = '/tabs/tab1'
        })
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
