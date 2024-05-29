
//import { AddAuthHeaderService } from './add-auth-header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {
   }
   login(body: any, role:string)  : Observable<any>{
    body.role=role
    return this.http.post(`${environment.apiurl}login`,body)
  }
  getUser(id: any)  : Observable<any>{
    return this.http.get(`${environment.apiurl}users/${id}`)
  }
}
