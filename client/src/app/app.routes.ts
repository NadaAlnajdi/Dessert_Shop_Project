import { Routes } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'cart', component: CartComponent },  
    {path:'**',redirectTo:'',pathMatch:'full'},

];
