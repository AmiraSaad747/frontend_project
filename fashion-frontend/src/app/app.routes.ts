import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Signup } from './pages/signup/signup';
import { Signin } from './pages/signin/signin';
import { Cart } from './pages/cart/cart';
import { AddProduct } from './pages/add-product/add-product';
import { Profile } from './pages/profile/profile';

import { adminGuard } from './guards/admin.guard';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'cart',
    component: Cart
  },



  {
  path: 'checkout',
  component: Checkout
},

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'signin',
    component: Signin
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'products',
    component: Products
  },

  {
    path: 'products/:id',
    component: ProductDetails
  },

  {
    path: 'add-product',
    component: AddProduct,
    canActivate: [adminGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];