import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule]
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  addresses!: any[];
  orders!: any[];
  userProfile: any;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userProfileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      gender: [''],
      role: [''],
      image: [''],

    });
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.userProfile = user;
        this.userProfileForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          gender: user.gender,
          role: user.role,
          image: user.image,
        });
      },
    );
  }

  updateProfile(): void {
    if (this.userProfileForm.valid) {
      const updatedData = this.userProfileForm.value;
      this.userService.updateUserProfile(updatedData).subscribe({
        next: response => {
          console.log('Profile updated successfully', response);
          this.userProfile = response;
        },
        error: err => {
          console.error('Error updating profile', err);
        }
      });
    }
  }

  cancelOrder(orderId: string): void {
    const orderToCancel = this.orders.find(order => order.id === orderId);
    if (orderToCancel && orderToCancel.status === 'pending') {
      this.userService.cancelOrder(orderId).subscribe({
        next: response => {
          console.log(`Order ${orderId} cancelled successfully`, response);
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        error: err => {
          console.error(`Error cancelling order ${orderId}`, err);
        }
      });
    } else {
      console.log(`Order ${orderId} cannot be cancelled.`);
    }
  }
}
