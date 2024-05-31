import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnChanges {
  @Input() category: any;
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.updateForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  ngOnChanges() {
    if (this.category) {
      this.updateForm.patchValue(this.category);
    }
  }

  onSubmit() {
    this.categoryService.updateCategory(this.category.id, this.updateForm.value).subscribe();
  }
}