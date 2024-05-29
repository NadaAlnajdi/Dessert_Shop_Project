import { AlertService } from './../../services/alert.service';
import { JwtTokenService } from './../../services/jwt-token.service';
import { AdminService } from './../../services/admin.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  adminLogin !: FormGroup
  errorMessage!:string
  @Output() isLogged = new EventEmitter()
  constructor(private router: Router,private _AdminService:AdminService, private _JwtTokenService:JwtTokenService, private AlertService:AlertService){
    this.adminLogin = new FormGroup({
      userName: new FormControl('',[Validators.required, Validators.maxLength(30)]),
      password: new FormControl('',[Validators.required, Validators.maxLength(50)])
    })
  }
  ngOnInit(){
    const jwt = this._JwtTokenService.decodeToken(localStorage.getItem('token'))
    if(JSON.parse(JSON.stringify(jwt)).role === 'admin'){
      this.router.navigate(['admin/categories'],{ skipLocationChange: true })
      this.isLogged.emit(true)
    } 
  }

  redirectToAdminDashBoard(){
    this._AdminService.login(this.adminLogin.value,'admin').subscribe(
      data => {    
        localStorage.setItem('token',data.token)    
        const jwt = this._JwtTokenService.decodeToken(localStorage.getItem('token'))
        JSON.stringify(jwt) 
        if(JSON.parse(JSON.stringify(jwt)).role === 'admin'){
          this.router.navigate(['admin/categories'],{ skipLocationChange: true })
          this.isLogged.emit(true)
        } 
        else{
          this.isLogged.emit(false)
        }

      },
      error => { 
        this.errorMessage =  error.error.message
        this.AlertService.myAlert('error','Unauthorized !', this.errorMessage)

      }
    )
  }


  handleSubmitForm(){

  }
}
