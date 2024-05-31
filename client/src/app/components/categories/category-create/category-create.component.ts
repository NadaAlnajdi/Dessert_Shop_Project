import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.createForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  onSubmit() {
    this.categoryService.addCategory(this.createForm.value).subscribe();
  }
}