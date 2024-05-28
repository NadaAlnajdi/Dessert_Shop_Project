import { Routes } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path:'',component:WishlistComponent},
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/cart', pathMatch: 'full' },
    { path: '**', redirectTo: '/cart' }
];
