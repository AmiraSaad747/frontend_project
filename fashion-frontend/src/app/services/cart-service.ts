import {
  Service,
  signal,
  computed
} from '@angular/core';

import { Product } from '../models/product';


export interface CartItem {

  product: Product;

  quantity: number;

}


@Service()
export class CartService {


  private items = signal<CartItem[]>([]);


  // Read-only cart

  readonly cartItems =
    this.items.asReadonly();


  // Total number of products

  readonly totalQuantity = computed(() => {

    return this.items().reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  });


  // Total price

  readonly totalPrice = computed(() => {

    return this.items().reduce(
      (total, item) =>
        total +
        item.product.price *
        item.quantity,
      0
    );

  });


  // ADD PRODUCT

  addToCart(product: Product): void {

    const currentItems = this.items();


    const existingItem =
      currentItems.find(
        item =>
          item.product._id === product._id
      );


    if (existingItem) {

      this.items.update(items =>

        items.map(item =>

          item.product._id === product._id

            ? {
                ...item,

                quantity:
                  item.quantity + 1
              }

            : item

        )

      );

    }

    else {

      this.items.update(items => [

        ...items,

        {
          product,
          quantity: 1
        }

      ]);

    }

  }


  // REMOVE ONE

  decreaseQuantity(
    productId: string
  ): void {

    this.items.update(items =>

      items
        .map(item => {

          if (
            item.product._id === productId
          ) {

            return {
              ...item,

              quantity:
                item.quantity - 1

            };

          }

          return item;

        })

        .filter(
          item => item.quantity > 0
        )

    );

  }


  // REMOVE COMPLETELY

  removeFromCart(
    productId: string
  ): void {

    this.items.update(items =>

      items.filter(
        item =>
          item.product._id !== productId
      )

    );

  }


  // CLEAR CART

  clearCart(): void {

    this.items.set([]);

  }

}