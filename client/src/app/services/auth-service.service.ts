import { AddAuthHeaderService } from './add-auth-header.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(  private http:HttpClient, private AddAuthHeaderService:AddAuthHeaderService ) { }


  register(body: Object)  : Observable<any>{

    if(this.AddAuthHeaderService.handleRequestOption()){
      return this.http.post(`${environment.apiurl}register`,body)
    }
    else{
      return this.http.post(`${environment.apiurl}register`,body)
    }
    
  }
  
}
