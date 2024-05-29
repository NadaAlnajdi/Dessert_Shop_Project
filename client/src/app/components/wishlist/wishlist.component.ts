import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistProducts: any[] = [];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getWishlist().subscribe(
      (data: any) => {
        console.log(data?.products);
        
        this.wishlistProducts = data?.products;
      },
      (error:any) => {
        console.error('Error fetching wishlist', error);
      }
    );
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

  addTOCart(productId:number){

  }


}