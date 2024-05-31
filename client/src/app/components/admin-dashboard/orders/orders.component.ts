import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderService } from '../../../services/order.service';
import { OrderProductsModalComponent } from './order-products-modal/order-products-modal.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    NgxPaginationModule,
    OrderProductsModalComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [DatePipe],
})
export class OrdersComponent implements OnInit {
  allOrders!: any[];
  selectedProducts: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;

  @ViewChild(OrderProductsModalComponent)
  productsModal!: OrderProductsModalComponent;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrdersData();
  }

  fetchOrdersData(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.allOrders = data;
      },
      (error) => {
        console.error('Error fetching Users data', error);
      }
    );
  }

  changeOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      (response) => {
        console.log('Order status updated', response);
        this.fetchOrdersData();
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );
  }

  acceptOrder(orderId: number): void {
    this.changeOrderStatus(orderId, 'accepted');
  }

  rejectOrder(orderId: number): void {
    this.changeOrderStatus(orderId, 'rejected');
  }

  openProductModal(order: any): void {
    this.selectedProducts = order.order_items.map((item: any) => item);
    const modalElement = document.getElementById('orderProductsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
