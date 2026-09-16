import {
  Component,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart-service';


@Component({
  selector: 'app-cart',

  imports: [
    RouterLink
  ],

  templateUrl: './cart.html',

  styleUrl: './cart.css'
})
export class Cart {

  cartService = inject(CartService);


  increase(
    productId: string
  ): void {

    const item =
      this.cartService
        .cartItems()
        .find(
          item =>
            item.product._id === productId
        );


    if (item) {

      this.cartService.addToCart(
        item.product
      );

    }

  }


  decrease(
    productId: string
  ): void {

    this.cartService.decreaseQuantity(
      productId
    );

  }


  remove(
    productId: string
  ): void {

    this.cartService.removeFromCart(
      productId
    );

  }


  clear(): void {

    this.cartService.clearCart();

  }

}