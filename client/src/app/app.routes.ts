import { Routes } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'',component:UserProfileComponent},
    {path:'home',component:HomeComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'wishlist', component: WishlistComponent },
    {path:'**',redirectTo:'',pathMatch:'full'},

];
