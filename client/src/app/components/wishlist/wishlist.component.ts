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
  wishlistProducts: any[] = [
    {
      image:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      Name:'nada',
      Price:'200',
      stock_quantity:2
    },
    {
      image:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      Name:'nada',
      Price:'200',
      stock_quantity:0
    }


  ];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getWishlist().subscribe(
      (data: any[]) => {
        this.wishlistProducts = data;
      },
      (error:any) => {
        console.error('Error fetching wishlist', error);
      }
    );
  }

  removeProduct(productId: number): void {
    this.wishlistService.removeFromWishlist(productId).subscribe(
      () => {
        this.wishlistProducts = this.wishlistProducts.filter(product => product.id !== productId);
      },
      (error:any) => {
        console.error('Error removing product from wishlist', error);
      }
    );
  }

  addTOCart(productId:number){

  }


}