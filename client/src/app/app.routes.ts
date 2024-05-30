import { Routes } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';

import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path:'',component:WishlistComponent},
    {path:'login',component:LoginComponent},
    {path:'loginAdmin',component:LoginAdminComponent},
    {path:'signup',component:SignupComponent},

import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'',component:UserProfileComponent},
    {path:'home',component:HomeComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'cart', component: CartComponent },  
    {path:'**',redirectTo:'',pathMatch:'full'},


];
