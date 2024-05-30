import { AdminService } from './../../services/admin.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from './../../services/alert.service';
import { JwtTokenService } from './../../services/jwt-token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: FormGroup;
  errorMessage!: string;

  constructor(
    private router: Router,
    private jwtTokenService: JwtTokenService,
    private alertService: AlertService,
    private adminService: AdminService // Inject AdminService here
  ) {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Change userName to email
      password: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  redirectToHome() {
    const loginData = {
      email: this.login.get('email')?.value,
      password: this.login.get('password')?.value
    };

    console.log('Login Data:', loginData); // Log the payload for debugging
    this.adminService.login(this.login.value, 'user').subscribe(
      data => {
        localStorage.setItem('token', data.token);
        //this.router.navigate(['signup']);
        this.router.navigate(['']);
      },
      error => {
        console.error('Login Error:', error); // Log error for debugging
        this.errorMessage = error.error.message;
        this.alertService.myAlert('error', 'Unauthorized!', this.errorMessage);
      }
    );
  }
}
