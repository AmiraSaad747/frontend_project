import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';

import { Product } from '../../models/product';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  private cartService = inject(CartService);


  // =========================
  // PRODUCT
  // =========================

  product = signal<Product | null>(null);


  // =========================
  // LOADING
  // =========================

  loading = signal(true);


  // =========================
  // ERROR
  // =========================

  errorMessage = signal('');


  // =========================
  // CART MESSAGE
  // =========================

  cartMessage = signal('');


  // =========================
  // SELECTED SIZE
  // =========================

  selectedSize = signal<Product['size'] | ''>('');


  // =========================
  // SIZES BY CATEGORY
  // =========================

  sizesByCategory: Record<string, Product['size'][]> = {

    dresses: [
      'XS',
      'S',
      'M',
      'L',
      'XL'
    ],

    shirts: [
      'XS',
      'S',
      'M',
      'L',
      'XL'
    ],

    pants: [
      'XS',
      'S',
      'M',
      'L',
      'XL'
    ],

    shoes: [
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42'
    ],

    accessories: [
      'No Size'
    ]

  };


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');


    if (!id) {

      this.errorMessage.set(
        'Product ID is missing'
      );

      this.loading.set(false);

      return;
    }


    this.loadProduct(id);

  }


  // =========================
  // LOAD PRODUCT
  // =========================

  loadProduct(id: string): void {

    this.loading.set(true);

    this.errorMessage.set('');


    this.productService
      .getProductById(id)
      .subscribe({

        next: (response) => {

          const currentProduct =
            response.data.product;


          this.product.set(
            currentProduct
          );


          // Accessories don't need
          // a size selection

          if (
            currentProduct.category ===
            'accessories'
          ) {

            this.selectedSize.set(
              'No Size'
            );

          }


          this.loading.set(false);

        },


        error: (error) => {

          console.error(
            'Product details error:',
            error
          );


          this.errorMessage.set(
            error?.error?.message ||
            'Unable to load product'
          );


          this.loading.set(false);

        }

      });

  }


  // =========================
  // GET SIZES
  // =========================

  getSizes(): Product['size'][] {

    const currentProduct =
      this.product();


    if (!currentProduct) {

      return [];

    }


    return (
      this.sizesByCategory[
        currentProduct.category
      ] || []
    );

  }


  // =========================
  // SELECT SIZE
  // =========================

  selectSize(
    size: Product['size']
  ): void {

    this.selectedSize.set(size);

    // Remove previous message
    this.cartMessage.set('');

  }


  // =========================
  // IMAGE URL
  // =========================

  getImageUrl(): string {

    return this.productService.getImageUrl(
      this.product()?.imageUrl
    );

  }


  // =========================
  // ADD TO CART
  // =========================

  addToCart(): void {

    const currentProduct =
      this.product();


    if (!currentProduct) {

      return;

    }


    // Make sure user selected a size

    if (!this.selectedSize()) {

      this.cartMessage.set(
        'Please select a size first.'
      );

      return;

    }


    // TypeScript now knows that
    // selectedSize is not empty

    const selectedSize =
      this.selectedSize();


    if (!selectedSize) {

      return;

    }


    // Create a copy of the product
    // with the selected size

    const productWithSize: Product = {

      ...currentProduct,

      size: selectedSize

    };


    // Add product to cart

    this.cartService.addToCart(
      productWithSize
    );


    // Show success message

    this.cartMessage.set(
      `${currentProduct.name} added to cart!`
    );


    console.log(
      'Added to cart:',
      productWithSize
    );


    console.log(
      'Cart:',
      this.cartService.cartItems()
    );


    // Hide message after 2.5 seconds

    setTimeout(() => {

      this.cartMessage.set('');

    }, 2500);

  }

}