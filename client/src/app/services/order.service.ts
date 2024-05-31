import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from './errorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/admin/orders`;

  constructor(private http: HttpClient) {}

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${orderId}`, { status })
      .pipe(catchError(handleError));
  }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(catchError(handleError));
  }
}
