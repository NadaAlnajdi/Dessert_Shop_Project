import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressesService {
  private apiUrl = `${environment.apiUrl}/shipping-address`;

  constructor(private http: HttpClient){}

  getShippingAddress(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  saveShippingAddress(addressData: any): Observable<any> {
    return this.http.post(this.apiUrl, addressData);
  }
}
