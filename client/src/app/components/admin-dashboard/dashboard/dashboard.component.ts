import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe, TitleCasePipe],
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  allUsers!: number;
  allProducts!: number;
  allOrders!: number;
  allPromotions!: number;
  latestUsers!: any[];
  latestProducts!: any[];
  latestOrders!: any[];
  latestCategories!: any[];
  latestPromotions!: any[];

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.adminDashboardService.getDashboardData().subscribe(
      (data) => {
        this.dashboardData = data;
        console.log(data);
        this.allUsers = data.users_count;
        this.allProducts = data.products_count;
        this.allOrders = data.orders_count;
        this.allPromotions = data.promotions_count;
        this.latestUsers = data.latest_users;
        this.latestProducts = data.latest_products;
        this.latestOrders = data.latest_orders;
        this.latestCategories = data.latest_categories;
        this.latestPromotions = data.latest_promotions;
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
