import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${orderId}`);
  }

  getUserOrders(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/users/${id}/orders`);
  }
}
