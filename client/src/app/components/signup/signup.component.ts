import { AuthServiceService } from './../../services/auth-service.service';
import { AlertService } from './../../services/alert.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtTokenService } from '../../services/jwt-token.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup
  errorMessage?: string;
  sendData = new FormData()
  constructor(private router: Router, private _authServiceService : AuthServiceService, private AlertService:AlertService, 
    private JwtTokenService : JwtTokenService ){

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
      email: new FormControl('',[
        Validators.required, 
        Validators.email,
        Validators.maxLength(200)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/), 
        Validators.maxLength(50)
      ]),
      confirmPassword: new FormControl('',[
        Validators.required
      ]),
      gender: new FormControl('', [  // Added gender field
      Validators.required
    ]),
        image: new FormControl()
      },
      {
        validators: this.matchPassword
      }
      
      )
  }


   // Custom validator to check if the password and confirmPassword fields match
   matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value)
      return {
        passwordNotMatch: true
      };

    return null;
  };

  registerPhoto(e:any)
  {
    this.sendData.append('image',e.target.files[0])
  }

  signup(){
       // Append form data to the sendData object, converting form field names to match backend expectations
    for (const property in this.signupForm.value) {
      console.log(this.signupForm.value)
      if (property === 'confirmPassword') {
        this.sendData.append('password_confirmation', this.signupForm.value[property]);
      } else {
        this.sendData.append(property, this.signupForm.value[property]);
      }
    }
      this._authServiceService.register(this.sendData).subscribe(
        data => {    
          if (JSON.parse(JSON.stringify(this.JwtTokenService.decodeToken(data.token))).role !== 'admin') {
            localStorage.setItem('token', data.token); // Store the token if the user is not an admin
          }
          this.sendData = new FormData(); // Reset the FormData
          this.AlertService.myAlert('success', `Welcome ${data.data.newUser.first_name}`, 'You registered successfully'); 
          // Navigate to the WishlistComponent
        this.router.navigate(['/']);   
        },
        error => { 
          this.errorMessage = error.error.message;
        this.sendData = new FormData(); // Reset the FormData
        this.AlertService.myAlert('error', 'Error', this.errorMessage!);
        },
      )
  }
}
