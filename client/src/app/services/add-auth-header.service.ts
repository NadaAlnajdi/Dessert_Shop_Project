import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddAuthHeaderService {

  constructor() { }
   handleRequestOption() {
    const authToken =  localStorage.getItem('token');
   const headers = new HttpHeaders({'Authorization':`Bearer ${authToken}`});
    return {headers:headers}
  }
}
