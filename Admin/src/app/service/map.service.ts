import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private request:RequestService) { }

  getMarkers(){
    return this.request.InviaRichiesta("POST",'/api/markers')
  }
}
