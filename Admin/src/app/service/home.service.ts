import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private request: RequestService) { }

  getUserNumber(){
    return this.request.InviaRichiesta("GET",'/api/user/number')
  }
  getWorkersNumber(){
    return this.request.InviaRichiesta("GET",'/api/workers/number')
  }

  getPerizieNumber(){
    return this.request.InviaRichiesta("GET",'/api/perizie/number')
  }
}
