import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { switchAll } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

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
},(error: AxiosError) => {
  if(error.response?.status === 403){
    localStorage.removeItem("token")
    Swal.fire({
      title: 'Errore',
      text: 'Sessione scaduta',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "/login"
    })
  }
  return Promise.reject(error)
});
