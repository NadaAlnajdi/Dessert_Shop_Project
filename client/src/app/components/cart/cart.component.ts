import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.servics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  cart_id: any = localStorage.getItem('cart_id');
  user_id: number = parseInt(localStorage.getItem('id')!, 10);
  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    this.sub = this.cartService.getCartByUserId(this.user_id).subscribe(items => {
      this.sub = this.cartService.getCartItems().subscribe(items => {
        this.cart = items;
        this.calculateTotalPrice();
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((total, item) => {
      if (item.product) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  }

  removeFromCart(cartItemId: number): void {
    this.cartService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        console.log('Item has been deleted.');
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
  }
}
