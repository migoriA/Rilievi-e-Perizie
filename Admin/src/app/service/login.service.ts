import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private reqest: RequestService) { }

  request(username : string, password : string){
    return this.reqest.InviaRichiesta('POST', '/api/login', {username, password});
  }
}
