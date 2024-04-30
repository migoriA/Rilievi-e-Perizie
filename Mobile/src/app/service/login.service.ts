import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any
  constructor(private request:RequestService) { }

  login(username : string, password : string){
    this.request.InviaRichiesta('POST','/api/userLogin',{"username":username,"password":password}).then(response => {
      this.user = response.data
      console.log(this.user)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
