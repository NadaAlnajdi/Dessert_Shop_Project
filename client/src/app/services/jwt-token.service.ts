import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  jwtToken!: string;
  decodedToken!: { [key: string]: string };
  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken(token:string|null) {
    if(token !== null){
      return jwt_decode.jwtDecode(token);
    }
    else{
      return null
    }
    
  }
}

