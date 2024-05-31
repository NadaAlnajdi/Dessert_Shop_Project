import {
  Component,
  OnInit,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { PromotionService } from '../../../../services/promotion.service';
import { ProductService } from '../../../../services/product.service';
import {
  dateRangeValidator,
  startDateValidator,
} from '../date-range.validator';

@Component({
  selector: 'app-add-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.css',
})
export class AddPromotionComponent implements OnInit {
  @ViewChild('addPromotionModal') addPromotionModal!: ElementRef;
  @Output() promotionAdded = new EventEmitter<void>();

  promotionForm!: FormGroup;
  products: any[] = [];
  activePromotions: any[] = [];
  productError: string | null = null;
  serverError: string | null = null;

  constructor(
    private promotionService: PromotionService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.promotionForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: [''],
        discount: [
          1,
          [Validators.required, Validators.min(1), Validators.max(100)],
        ],
        startDate: ['', [Validators.required, startDateValidator()]],
        endDate: ['', Validators.required],
        isActive: [true, Validators.required],
        products: [[], [Validators.required, this.productValidator()]],
      },
      { validators: dateRangeValidator() }
    );
    this.fetchPromotionsData();
    this.fetchProductsData();
  }

  fetchPromotionsData(): void {
    this.promotionService.getActivePromotions().subscribe(
      (data) => {
        this.activePromotions = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching Promotions data', error);
      }
    );
  }

  fetchProductsData(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching Products data', error);
      }
    );
  }

  productValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedProducts = control.value;
      const invalidProducts = selectedProducts.filter((selectedProduct: any) =>
        this.activePromotions.some((promotion) =>
          promotion.products.includes(selectedProduct)
        )
      );
      return invalidProducts.length > 0 ? { invalidProducts: true } : null;
    };
  }

  onSubmit() {
    if (this.promotionForm.valid) {
      const {
        title,
        description,
        discount,
        startDate,
        endDate,
        isActive,
        products,
      } = this.promotionForm.value;

      const promotionData = {
        title,
        description,
        discount,
        start_date: startDate,
        end_date: endDate,
        is_active: isActive,
        products,
      };

      this.promotionService.addPromotion(promotionData).subscribe(
        (response) => {
          console.log('Promotion saved successfully:', response);

          // Reset the form
          this.promotionForm.reset({
            title: '',
            description: '',
            discount: 0,
            startDate: '',
            endDate: '',
            isActive: true,
            products: [],
          });
          this.serverError = null;

          // Close the modal programmatically
          const modalElement = this.addPromotionModal.nativeElement;
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();

          // Emit the event to notify the parent component
          this.promotionAdded.emit();
        },
        (error) => {
          this.serverError = error;
        }
      );
    }
  }
}
