import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public users:any = {};
  public clients:any = {};
  public user:any = {};

  constructor(private request:RequestService) { }

  getList(){
    return this.request.InviaRichiesta("GET","/api/perizie/getPerizie")
  }

  getClients(){
    this.request.InviaRichiesta("GET","/api/clienti").then((result:any) => {
      this.clients = result.data;
    }).catch(err => {console.error(err.message)})
  }

  getUser(){
    this.request.InviaRichiesta("GET","/api/utenti").then((result:any) => {
      this.users = result.data;
    }).catch(err => {console.error(err.message)})
  }

  getDetails(id: any) {
    return new Promise<void>(resolve =>{
      this.request.InviaRichiesta("POST", "/api/perizie/" + id).then((result:any) => {
        this.user = result.data;
        resolve()
      }).catch(err => {
        console.error(err.message)
        resolve()
      })
    })
  }
}
