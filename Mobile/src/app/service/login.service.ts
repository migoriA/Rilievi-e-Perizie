import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any
  constructor(private request:RequestService) { }

  login(username : string, password : string){
    return this.request.InviaRichiesta('POST','/api/userLogin',{"username":username,"password":password})
  }

  requestPassword(username : string){
    return this.request.InviaRichiesta('POST','/api/modifyPassword',{"username":username})
  }
}