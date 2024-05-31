import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-products-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-products-modal.component.html',
  styleUrl: './order-products-modal.component.css',
})
export class OrderProductsModalComponent {
  @Input() products: any[] = [];
}
