import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-orders-modal',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './user-orders-modal.component.html',
  styleUrls: ['./user-orders-modal.component.css'],
})
export class UserOrdersModalComponent {
  @Input() orders: any[] = [];

  constructor() {}
}
