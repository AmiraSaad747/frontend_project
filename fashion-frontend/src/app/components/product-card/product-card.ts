import {
  Component,
  input,
  inject,
  output
} from '@angular/core';

import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  // Product received from parent
  product = input.required<Product>();

  // Services
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private router = inject(Router);

  // Event sent to parent when product is deleted
  onDelete = output<string>();


  // Open Product Details
  openDetails(): void {

    const id = this.product()._id;

    if (id) {
      this.router.navigate(['/products', id]);
    }

  }


  // Add product to cart
  addToCart(event: Event): void {

    // Don't open Product Details
    event.stopPropagation();

    this.cartService.addToCart(
      this.product()
    );

    console.log(
      'Added to cart:',
      this.product().name
    );

    console.log(
      'Cart:',
      this.cartService.cartItems()
    );

  }


  // Delete product
  deleteProduct(event: Event): void {

    // Don't open Product Details
    event.stopPropagation();

    const id = this.product()._id;

    if (id) {
      this.onDelete.emit(id);
    }

  }


  // Get correct image URL
  getImageUrl(path?: string): string {

    return this.productService.getImageUrl(path);

  }

}