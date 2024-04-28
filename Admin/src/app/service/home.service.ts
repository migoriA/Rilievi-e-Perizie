import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  perizie: any ; 
  utenti: any ;
  constructor(private request: RequestService) { }

  getLastPerizie(){
    return new Promise<void>((resolve,reject) => {
      this.request.InviaRichiesta('GET', '/api/homePageData').then((response: AxiosResponse) => {
        this.perizie = response.data.perizie;
        this.utenti = response.data.utenti;
        resolve()
        console.log(response.data)
      }).catch((error) => {console.log(error)
        reject()
      })
    })
  }
}
