import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent {
  categoryId: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe(() => {
    });
  }
}
