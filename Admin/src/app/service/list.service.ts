import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public users:any = {};
  public clients:any = {};
  public user:any = {};

  constructor(private request:RequestService,private router:Router) { }

  getList(){
    return this.request.InviaRichiesta("GET","/api/perizie/getPerizie")
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
  update(perizia: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.request.InviaRichiesta("PATCH", "/api/updatePerizia/" + perizia._id, perizia )
        .catch(error => {
          reject(error);
        })
        .then(async (response) => {
          await this.getList();
          this.router.navigate(['/home/list']);
          Swal.fire("Perizia modificata", "", "success");
          
          resolve();
       });
    });
  }
}
