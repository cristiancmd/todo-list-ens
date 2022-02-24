import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(   ) { }


  login(cred:any){

    if(cred.username == 'test' && cred.password=='test') {
      let user = {username:"Test" }
      return user;
    }
    return false;
  }


  saveSessionData(data: any):boolean {
    let session = localStorage.getItem("session-data")
    if (session) {
      return false;
    } else {
      let datastr = JSON.stringify(data);
      localStorage.setItem("session-data", datastr);
      return true;
    }
  }

  removeSessionData():boolean{
    let session = localStorage.getItem("session-data")
    if (session) {
      localStorage.removeItem("session-data");
      return true;

    }
    return false;
  }

}
