import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { UserOrdersModalComponent } from './user-orders-modal/user-orders-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    TitleCasePipe,
    UserOrdersModalComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  allUsers!: any[];
  userOrders!: any[];
  page: number = 1;
  itemsPerPage: number = 10;

  @ViewChild(UserOrdersModalComponent)
  userOrdersModal!: UserOrdersModalComponent;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    this.adminDashboardService.getUsersData().subscribe(
      (data) => {
        this.allUsers = data;
      },
      (error) => {
        console.error('Error fetching Users data', error);
      }
    );
  }

  fetchUserOrdersData(id: number): void {
    this.adminDashboardService.getUserOrders(id).subscribe(
      (data) => {
        this.userOrders = [];
        data.shipping_addresses.forEach((address: any) => {
          this.userOrders.push(...address.orders);
        });
        this.openOrdersModal();
      },
      (error) => {
        console.error('Error fetching User Orders data', error);
      }
    );
  }

  openOrdersModal(): void {
    const modalElement = document.getElementById('userOrdersModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
