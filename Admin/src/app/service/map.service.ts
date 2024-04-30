import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private perizie:any = {}
  constructor(private request:RequestService) { }

  getMarkers(){
    return new Promise<any>((resolve,reject)=>{
      this.request.InviaRichiesta("POST",'/api/markers').then((res)=>{
        this.perizie = res.data
        resolve(this.perizie)
      }).catch((err)=>{
        console.log(err)
        reject()
      })
    })
  }
  getDestination(id: any) {
    let coor = ''
    this.request.InviaRichiesta("POST",'/api/destination/'+id).then((res)=>{
       coor = res.data
    }).catch((err)=>{
      console.log(err)
    })

    return coor
  }
}
