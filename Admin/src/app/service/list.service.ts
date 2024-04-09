import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public users:any = {};
  constructor(private request:RequestService) { }

  getList(url:string){
    return this.request.InviaRichiesta("GET",url)
  }
  getUser(){
    return this.request.InviaRichiesta("GET","/api/utenti")
  }
}
