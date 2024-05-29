import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports:[CommonModule,CurrencyPipe],
  standalone:true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = { cart_items: [] }; // Initialize with empty cart_items array
  subtotal: number = 0;
  totalPrice: number = 0;

  constructor(private http: HttpClient) {
    console.log('CartComponent instantiated');
  }

  ngOnInit() {
    console.log('CartComponent ngOnInit');
    this.getCart();
  }

  getCart() {
    const userId = 1; // Replace with the actual user ID
    this.http.get(`/api/cart/${userId}`).subscribe({
      next: (data: any) => {
        console.log('Cart data received:', JSON.stringify(data, null, 2));
        this.cart = data.cart;
        this.subtotal = data.subtotal;
        this.totalPrice = data.total_price;
        console.log('Cart items:', this.cart.cart_items); // Debug log
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      }
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
