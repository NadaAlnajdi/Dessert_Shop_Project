import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PromotionService } from '../../../../services/promotion.service';

@Component({
  selector: 'app-delete-promotion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-promotion.component.html',
  styleUrl: './delete-promotion.component.css',
})
export class DeletePromotionComponent {
  @Input() promotionSlug!: string;
  @Output() promotionDeleted = new EventEmitter<void>();
  serverError: string | null = null;

  constructor(
    private promotionService: PromotionService,
    private router: Router
  ) {}

  onDelete(): void {
    this.promotionService.deletePromotion(this.promotionSlug).subscribe(
      (response) => {
        console.log('Promotion deleted successfully:', response);
        this.promotionDeleted.emit();
      },
      (error) => {
        this.serverError = error;
      }
    );
  }
}
