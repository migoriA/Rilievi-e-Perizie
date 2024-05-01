import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    constructor(private request:RequestService) { }
    codOp:any
    perizie:any
    getUserInfo(user:any){
        return new Promise<void>((resolve,reject)=>{
            this.request.InviaRichiesta('POST','/api/userHomeMobile',{"user":user}).then(response => {
                this.codOp = response.data.codOp
                this.perizie = response.data.perizie
                localStorage.setItem('codOp',JSON.stringify(this.codOp))
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    }
}