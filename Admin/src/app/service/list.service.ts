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
  public maxId = 0

  constructor(private request:RequestService,private router:Router) { }

  getList(){
    return this.request.InviaRichiesta("GET","/api/perizie/getPerizie")
  }

  getUser(){
    return new Promise<void>((resolve, reject) => {
      this.request.InviaRichiesta("GET","/api/utenti").then((result:any) => {
        this.users = result.data.filter((user:any) => !isNaN(user._id));
        this.maxId = Math.max(...this.users.map(function(o:any) { return o._id; }))
        resolve()
      }).catch(err => {
        console.error(err.message)
        reject(err)
      })
    })
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
  addUser(field:any){
    return new Promise<void>((resolve, reject) => {
      this.request.InviaRichiesta("POST","/api/addUser",field).then(async(result:any) => {
        await this.getUser()
        Swal.fire("Utente aggiunto", "", "success")
        this.router.navigate(['/home/userlist'])
        resolve()
      })
      .catch(err => {
        console.error(err.message)
        reject(err)
      })
    })
  }
}
