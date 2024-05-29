import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})


export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        street: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // Handle the form submission
      console.log('Form Submitted', this.checkoutForm.value);
      // Redirect to a confirmation page or handle the logic as needed
      this.router.navigate(['/confirmation']);
    }
  }
}