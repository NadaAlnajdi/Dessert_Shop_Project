import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { ShippingAddressesService } from '../../services/shipping-addresses.service';
import { CommonModule } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService,private shippingAddressesService:ShippingAddressesService) {}


  ngOnInit(): void {
    this.initForm();
    this.loadShippingAddresses();
    this.loadOrderItems();
  }

  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
      shipping_address_id: [''], // Default to empty
      shipping_address: this.formBuilder.group({
        city: [''],
        state: [''],
        street: [''],
        phoneNumber: ['']
      })
    });
  }

  loadShippingAddresses(): void {
    this.shippingAddressesService.getShippingAddress().subscribe(addresses => {
      this.shippingAddresses = addresses;
    });
  }

  loadOrderItems(): void {
    // Load order items and calculate total price
    this.orderItems = [
      { product_name: 'Vanilla salted caramel', quantity: 1, price: 300.00 },
      { product_name: 'German chocolate', quantity: 1, price: 170.00 },
      { product_name: 'Sweet autumn', quantity: 1, price: 170.00 },
      { product_name: 'Gluten free mini dozen', quantity: 1, price: 110.00 }
    ];
    this.totalPrice = this.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const formValue = this.checkoutForm.value;
  
      // Ensure shipping_address_id and shipping_address are not null
      const shipping_address_id = formValue.shipping_address_id ?? null;
      const shipping_address = formValue.shipping_address_id === '' ? formValue.shipping_address : null;
  
      const orderData = {
        order_items: this.orderItems,
        shipping_address_id: shipping_address_id,
        shipping_address: shipping_address
      };
  
      this.checkoutService.createOrder(orderData).subscribe(
        (response) => {
          console.log('Order placed successfully', response);
          // Handle success, maybe redirect to a confirmation page
        },
        (error) => {
          console.error('Error placing order', error);
          // Handle error, display error message to user
        }
      );
    } else {
      // Form is invalid, display error messages to user or handle accordingly
    }
  }
}