import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form : FormGroup = new FormGroup({
    username: new FormControl('' , [Validators.required]),
    password: new FormControl('' , [Validators.required])
  })
  constructor(protected router: Router, private logInService:LoginService) {  }

  logIn(){
    this.logInService.request(this.form.get('username')!.value,this.form.get('password')!.value).then((result:AxiosResponse) => {
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.error(err.message);
      Swal.fire({
        title: 'Error!',
        text: 'Username or password incorrect',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });
  }
}
