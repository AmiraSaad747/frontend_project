
import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  forkJoin
} from 'rxjs';

import {
  CartService
} from '../../services/cart-service';

import {
  ProductService
} from '../../services/product-service';


@Component({

  selector: 'app-checkout',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './checkout.html',

  styleUrl: './checkout.css'

})
export class Checkout {


  // =========================
  // SERVICES
  // =========================

  cartService =
    inject(CartService);


  private productService =
    inject(ProductService);


  private fb =
    inject(FormBuilder);


  // =========================
  // MESSAGES
  // =========================

  successMessage = '';

  errorMessage = '';


  // =========================
  // CHECKOUT FORM
  // =========================

  checkoutForm =
    this.fb.nonNullable.group({

      name: [

        '',

        [

          Validators.required,

          Validators.minLength(3)

        ]

      ],


      phone: [

        '',

        Validators.required

      ],


      address: [

        '',

        Validators.required

      ],


      city: [

        '',

        Validators.required

      ],


      paymentMethod: [

        'cash',

        Validators.required

      ]

    });


  // =========================
  // PLACE ORDER
  // =========================

  placeOrder(): void {


    // =========================
    // CLEAR OLD MESSAGES
    // =========================

    this.successMessage = '';

    this.errorMessage = '';


    // =========================
    // CHECK CART
    // =========================

    if (
      this.cartService.cartItems().length === 0
    ) {

      this.errorMessage =
        'Your cart is empty.';

      return;

    }


    // =========================
    // CHECK FORM
    // =========================

    if (
      this.checkoutForm.invalid
    ) {

      this.checkoutForm.markAllAsTouched();

      return;

    }


    // =========================
    // GET FORM DATA
    // =========================

    const orderData =
      this.checkoutForm.getRawValue();


    // =========================
    // GET CART ITEMS
    // =========================

    const cartItems =
      this.cartService.cartItems();


    // =========================
    // CREATE PURCHASE REQUESTS
    // =========================

    const requests =
      cartItems.map(item => {

        return this.productService.purchaseProduct(

          item.product._id!,

          item.quantity

        );

      });


    // =========================
    // SEND REQUESTS
    // =========================

    forkJoin(requests).subscribe({

      // =========================
      // SUCCESS
      // =========================

      next: () => {


        console.log(

          'Order placed:',

          {

            customer:
              orderData,

            products:
              cartItems,

            total:
              this.cartService.totalPrice()

          }

        );


        // =========================
        // SUCCESS MESSAGE
        // =========================

        this.successMessage =
          'Order placed successfully!';


        // =========================
        // CLEAR CART
        // =========================

        this.cartService.clearCart();


        // =========================
        // SCROLL TO TOP
        // =========================

        window.scrollTo({

          top: 0,

          behavior: 'smooth'

        });

      },


      // =========================
      // ERROR
      // =========================

      error: (error) => {


        console.error(

          'Order error:',

          error

        );


        this.errorMessage =

          error?.error?.message ||

          'Something went wrong while placing your order.';

      }

    });

  }

}

