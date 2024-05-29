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
];
