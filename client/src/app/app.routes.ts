import { Routes } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutlayoutComponent } from './components/aboutlayout/aboutlayout.component';
import {  ContactlayoutComponent  } from './components/contactlayout/contactlayout.component';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'about', component:AboutlayoutComponent},
  {path:'contact', component: ContactlayoutComponent },

{ path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
