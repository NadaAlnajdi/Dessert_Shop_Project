import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { DeletePromotionComponent } from './delete-promotion/delete-promotion.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    AddPromotionComponent,
    DeletePromotionComponent,
    ProductsModalComponent,
  ],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css',
  providers: [DatePipe],
})
export class PromotionsComponent implements OnInit {
  allPromotions!: any[];
  selectedProducts: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;

  @ViewChild(ProductsModalComponent) productsModal!: ProductsModalComponent;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchPromotionsData();
  }

  fetchPromotionsData(): void {
    this.adminDashboardService.getPromotionsData().subscribe(
      (data) => {
        this.allPromotions = data.data;
      },
      (error) => {
        console.error('Error fetching Users data', error);
      }
    );
  }

  onPromotionAction(): void {
    this.fetchPromotionsData();
  }

  openProductModal(promotion: any): void {
    this.selectedProducts = promotion.products.map((product: any) => {
      const discountedPrice =
        product.price - (product.price * promotion.discount) / 100;
      return { ...product, discountedPrice };
    });
    const modalElement = document.getElementById('productsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
