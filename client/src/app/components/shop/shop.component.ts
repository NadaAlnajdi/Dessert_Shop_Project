import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
