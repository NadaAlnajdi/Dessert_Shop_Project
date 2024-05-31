import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  allCategories!: any[];

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchCategoriesData();
  }

  fetchCategoriesData(): void {
    this.adminDashboardService.getCategoriesData().subscribe(
      (data) => {
        console.log(data);
        this.allCategories = data;
      },
      (error) => {
        console.error('Error fetching Users data', error);
      }
    );
  }
}
