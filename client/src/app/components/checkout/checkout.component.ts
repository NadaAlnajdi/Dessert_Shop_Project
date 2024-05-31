import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { ShippingAddressesService } from '../../services/shipping-addresses.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.servics';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout', 
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  shippingAddresses: any[] = [];
  orderItems: any[] = [];
  totalPrice: number = 0;

  constructor(private formBuilder: FormBuilder,private router: Router,  private toastr: ToastrService, private checkoutService: CheckoutService,private shippingAddressesService:ShippingAddressesService, private cartService:CartService) {}


  ngOnInit(): void {
    this.initForm();
    this.getShippingAddresses();
    this.getOrderItems();
  }

  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
      shipping_address_id: [''], // Default to empty
      shipping_address: this.formBuilder.group({
        city: [''],
        state: [''],
        street: [''],
        phone_number: ['']
      })
    });
  }

  getShippingAddresses(): void {
    this.shippingAddressesService.getShippingAddress().subscribe(addresses => {
      this.shippingAddresses = addresses;
    });
  }

  getOrderItems(): void {
    this.cartService.getCartItems().subscribe(
      items => {
        this.orderItems = items;
        this.totalPrice = this.orderItems.reduce((total, item) => total + (item.product?.price * item.quantity), 0);
      },
      error => {
        this.toastr.error('Failed to load cart items', 'Error');
      }
    );
  }



  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const formValue = this.checkoutForm.value;
  
      // Ensure shipping_address_id and shipping_address are not null
      const shipping_address_id = formValue.shipping_address_id ?? null;
      const shipping_address = formValue.shipping_address_id === '' ? formValue.shipping_address : null;
  
      const orderData = {
        order_items: this.orderItems,
       ...formValue
      };
      console.log(orderData);
      
      this.checkoutService.createOrder(orderData).subscribe((response) => {
        this.toastr.success('Your order has been placed successfully!', 'Order Placed');
        this.router.navigate(['/home']); 
      }, error => {
        this.toastr.error('There was an error placing your order. Please try again.', 'Order Failed');
        console.error('Error creating order:', error);
  }
)}
  
  }}
  