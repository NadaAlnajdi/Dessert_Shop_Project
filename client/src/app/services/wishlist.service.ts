import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://127.0.0.1:8000/wishlists/';

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  removeFromWishlist(productId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl+productId);
  }
}
