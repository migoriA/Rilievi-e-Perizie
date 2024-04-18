import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public perizie:any = {}
  constructor(private request:RequestService) { }

  async getMarkers(){
    await this.request.InviaRichiesta("POST",'/api/markers').then((res)=>{
      this.perizie = res.data
    }).catch((err)=>{console.log(err)})
  }
}
