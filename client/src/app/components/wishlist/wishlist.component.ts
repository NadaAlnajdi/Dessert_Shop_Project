import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartItem, CartService } from '../../services/cart.servics';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistProducts: any[] = [];
  cartItems: CartItem[] = [];
  addToCartDisabled: { [key: number]: boolean } = {};
  baseUrl: string = 'http://localhost:8000';

  constructor(private wishlistService: WishlistService ,private cartService:CartService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getWishlist();
    this.cartService.getCartItems();
  }

  getWishlist(): void {
    this.wishlistService.getWishlist().subscribe(
      (data: any) => {
        
        this.wishlistProducts = data?.products;
        console.log(this.wishlistProducts);


      },
      (error:any) => {
        console.error('Error fetching wishlist', error);
      }
    );
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        console.log(this.cartItems);
        
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  isProductInCart(productId: number): boolean {
    const inCart = this.cartItems.some(item => item.product_id === productId);
    console.log(`Product ${productId} is in cart:`, inCart); // Add this line to verify
    return inCart;
  }
  

  removeProduct(productId: number): void {
    this.wishlistService.removeFromWishlist(productId).subscribe(
      () => {
        this.getWishlist()

      },
      (error:any) => {
        console.error('Error removing product from wishlist', error);
      }
    );
  }


  addTOCart(product: any): void {
    if (this.isProductInCart(product.id)) {
      this.toastr.warning('Item is already in the cart!');
      return;
    }

    this.addToCartDisabled[product.id] = true;

    this.cartService.addToCart(product.id,1,product.price).subscribe(
      (response) => {
        this.toastr.success('Item added to cart!');
        console.log('Item added to cart:', response);
        this.cartItems.push(response); // Add the item to cartItems
        this.addToCartDisabled[product.id] = false; // Enable the button again
        // Handle success, e.g., show a success message or update cart count
      },
      
      (error) => {
        console.error('Error adding item to cart:', error);
        // Handle error, e.g., show an error message
      }
      
    );
  }

  getImageUrl(product: any): string {
    if (product.images && product.images.length > 0) {
      return `${this.baseUrl}/${product.images[0].path.replace('public/', '')}`;
    }
    return 'path/to/default/image.jpg';  // Provide a default image path
  }

}