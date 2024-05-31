import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from './errorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private apiUrl = `${environment.apiUrl}/admin/promotions`;

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(handleError));
  }

  getActivePromotions(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/promotions/active`)
      .pipe(catchError(handleError));
  }

  getPromotion(slug: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${slug}`)
      .pipe(catchError(handleError));
  }

  addPromotion(promotion: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, promotion)
      .pipe(catchError(handleError));
  }

  updatePromotion(slug: string, promotion: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${slug}`, promotion)
      .pipe(catchError(handleError));
  }

  deletePromotion(slug: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${slug}`)
      .pipe(catchError(handleError));
  }
}
