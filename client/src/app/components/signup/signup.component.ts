import { AuthServiceService } from './../../services/auth-service.service';
import { AlertService } from './../../services/alert.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Fixed typo: styleUrl to styleUrls
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage?: string;
  sendData = new FormData();

  constructor(private router: Router, private _authServiceService: AuthServiceService, private AlertService: AlertService) {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
        Validators.maxLength(200)
      ]),
      last_name: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
        Validators.maxLength(200)
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(200)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/), 
        Validators.maxLength(50)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl()
    }, {
      validators: this.matchPassword
    });
  }

  // Custom validator to check if the password and confirmPassword fields match
  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordNotMatch: true };
    }

    return null;
  };

  registerPhoto(e: any) {
    this.sendData.append('image', e.target.files[0]);
  }

  signup() {
    // Append form data to the sendData object, converting form field names to match backend expectations
    for (const property in this.signupForm.value) {
      if (property === 'confirmPassword') {
        this.sendData.append('password_confirmation', this.signupForm.value[property]);
      } else {
        this.sendData.append(property, this.signupForm.value[property]);
      }
    }

    this._authServiceService.register(this.sendData).subscribe(
      response => {
        // Assuming a successful response with a message
        this.AlertService.myAlert('success', 'Welcome', 'You registered successfully');
        this.sendData = new FormData(); // Reset the FormData
        this.router.navigate(['/login']); // Redirect to login page
      },
      error => {
        this.errorMessage = error.error.message;
        this.sendData = new FormData(); // Reset the FormData
        this.AlertService.myAlert('error', 'Error', this.errorMessage!);
      }
    );
  }
}
