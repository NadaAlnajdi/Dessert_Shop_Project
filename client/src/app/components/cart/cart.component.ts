import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  subtotal: number = 0;
  totalPrice: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    const userId = 1; // Replace with the actual user ID
    this.http.get(`/api/cart/${userId}`).subscribe((data: any) => {
      this.cart = data.cart;
      this.subtotal = data.subtotal;
      this.totalPrice = data.total_price;
    });
  }

  increaseQuantity(cartItemId: number) {
    this.http.put(`/api/cart/item/${cartItemId}/increase`, {}).subscribe((data: any) => {
      this.cart = data.cart;
      this.subtotal = data.subtotal;
      this.totalPrice = data.total_price;
    });
  }

  decreaseQuantity(cartItemId: number) {
    this.http.put(`/api/cart/item/${cartItemId}/decrease`, {}).subscribe((data: any) => {
      this.cart = data.cart;
      this.subtotal = data.subtotal;
      this.totalPrice = data.total_price;
    });
  }

  removeItem(cartItemId: number) {
    this.http.delete(`/api/cart/item/${cartItemId}`).subscribe((data: any) => {
      this.cart = data.cart;
      this.subtotal = data.subtotal;
      this.totalPrice = data.total_price;
    });
  }

  proceedToCheckout() {
    // Implement checkout logic
  }
}
