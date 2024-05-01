import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, {AxiosError, AxiosRequestConfig } from 'axios';
import { switchAll } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public alertController: AlertController) { }

  async InviaRichiesta(method : string, url : string, parameters : object = {}) {
    const config : AxiosRequestConfig = {
      "baseURL": 'https://server-rilievieperizie.onrender.com',
      "url":  url, 
      "method": method.toString(),
      "headers": {
        "Accept": "application/json",
      },
      "timeout": 15000,
      "responseType": "json",
    }
    
    if(parameters instanceof FormData){
      config.headers!["Content-Type"] = 'multipart/form-data;' 
      config["data"] = parameters
    }    
    else if(method === 'GET'){
        config.headers!["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8' 
        config["params"] = parameters   
    }
    else{
      config.headers!["Content-Type"] = 'application/json; charset=utf-8' 
      config["data"] = parameters    
    }    
    return axios(config);          
  }
}

axios.interceptors["request"].use((config) => {
  if("token" in localStorage){
    config.headers["authorization"] = localStorage["token"];
  }
  return config;
});

axios.interceptors["response"].use((response) => {
  const token = response.headers["authorization"];
  //console.error("porco dio")
  if(token)
  {
    localStorage["token"] = token
  }
  return response;
},async (error:AxiosError) => {
  if(error.response?.status === 403){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    let r = new RequestService(new AlertController()) 
    const alert = await r.alertController.create({
      header: 'Errore',
      message: 'Sessione scaduta, effettuare nuovamente il login',
      buttons: ['Ok'],
    });

    alert.present().then(()=>{
      window.location.href = "/tabs/tab1"
    })
  }
  return Promise.reject(error)
});