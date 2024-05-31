import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from './errorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/dashboard`)
      .pipe(catchError(handleError));
  }

  getUsersData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users`)
      .pipe(catchError(handleError));
  }

  getProductsData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/products`)
      .pipe(catchError(handleError));
  }

  getCategoriesData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/categories`)
      .pipe(catchError(handleError));
  }

  getOrdersData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/orders`)
      .pipe(catchError(handleError));
  }

  getPromotionsData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/promotions`)
      .pipe(catchError(handleError));
  }

  getUserOrders(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}/orders`);
  }
}
