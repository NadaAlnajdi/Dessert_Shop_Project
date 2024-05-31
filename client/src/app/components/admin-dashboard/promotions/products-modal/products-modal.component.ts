import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css'],
})
export class ProductsModalComponent implements OnInit {
  @Input() products: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
