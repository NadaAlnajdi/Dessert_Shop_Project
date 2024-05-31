import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
// import { ProductTableComponent } from './components/product-table/product-table.component';
import { CategoryComponent } from './components/categories/categories.component';
// import { ProductCreateComponent } from './components/product-table/product-create/product-create.component';
// import { ProductUpdateComponent } from './components/product-table/product-update/product-update.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryDeleteComponent } from './components/categories/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './components/categories/category-update/category-update.component';
// import { ProductDeleteComponent } from './components/product-table/product-delete/product-delete.component';
import { AboutlayoutComponent } from './components/aboutlayout/aboutlayout.component';
import { ContactlayoutComponent } from './components/contactlayout/contactlayout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/admin-dashboard/dashboard/dashboard.component';
import { UsersComponent } from './components/admin-dashboard/users/users.component';
import { ProductsComponent } from './components/admin-dashboard/products/products.component';
import { CategoriesComponent } from './components/admin-dashboard/categories/categories.component';
import { OrdersComponent } from './components/admin-dashboard/orders/orders.component';
import { PromotionsComponent } from './components/admin-dashboard/promotions/promotions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutlayoutComponent },
  { path: 'contact', component: ContactlayoutComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'product',
    // component: ProductTableComponent,
    children: [
      // { path: 'add', component: ProductCreateComponent },
      // { path: 'update/:id', component: ProductUpdateComponent },
      // { path: 'delete/:id', component: ProductDeleteComponent },
    ],
  },
  {
    path: 'category',
    component: CategoryComponent,
    children: [
      { path: 'add', component: CategoryCreateComponent },
      { path: 'update/:id', component: CategoryUpdateComponent },
      { path: 'delete/:id', component: CategoryDeleteComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'promotions', component: PromotionsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
