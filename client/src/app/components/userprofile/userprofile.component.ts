import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule]
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  addresses: any[] = [
    { city: 'New York', state: 'NY', phone: '123-456-7890' },


  ];
  orders: any[] = [
    { id: '1', date: '2024-05-28', total_price: 50.00, status: 'pending' },


  ];
  userProfile: any = {
    first_name: 'Fatma',
    last_name: 'Mahmoud',
    email: 'fatma12@gmail.com',
    gender: 'Female',
    role: 'user',
    phone_number: '123-456-7890',
    password: '********',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
  };

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userProfileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(user => {
      this.userProfile = user;
      this.userProfileForm.patchValue(user);
    });

  }

  updateProfile(): void {
    if (this.userProfileForm.valid) {
      const updatedData = this.userProfileForm.value;
      this.userService.updateUserProfile(updatedData).subscribe(response => {
        console.log('Profile updated successfully', response);

        this.userProfile = response; 
      });
    }
  }


  cancelOrder(orderId: string): void {
    const orderToCancel = this.orders.find(order => order.id === orderId);
    if (orderToCancel && orderToCancel.status === 'pending') {
      this.userService.cancelOrder(orderId).subscribe(response => {
        console.log(`Order ${orderId} cancelled successfully`, response);
        this.orders = this.orders.filter(order => order.id !== orderId);
      });
    } else {
      console.log(`Order ${orderId} cannot be cancelled.`);
    }
  }
}
