import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allProducts!: any[];

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchProductsData();
  }

  fetchProductsData(): void {
    this.adminDashboardService.getProductsData().subscribe(
      (data) => {
        this.allProducts = data;
      },
      (error) => {
        console.error('Error fetching Users data', error);
      }
    );
  }
}
