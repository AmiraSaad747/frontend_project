import {
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';

import {
  ProductService,
  ProductsListResponse
} from '../../services/product-service';

import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',

  standalone: true,

  imports: [
    ProductCard
  ],

  templateUrl: './product-list.html',

  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);

  private route = inject(ActivatedRoute);


  products = signal<Product[]>([]);

  loading = signal(true);

  errorMessage = signal('');


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const category =
        params['category'] || '';

      console.log(
        'Category from URL:',
        category
      );

      this.loadProducts(
        category || undefined
      );

    });

  }


  loadProducts(category?: string): void {

    this.loading.set(true);

    this.errorMessage.set('');


    this.productService
      .getProducts(category)

      .subscribe({

        next: (response: ProductsListResponse) => {

          console.log(
            'Products received:',
            response.data.products
          );

          console.log(
            'Products count:',
            response.count
          );


          this.products.set(
            response.data.products
          );

          this.loading.set(false);

        },


        error: (error: any) => {

          console.error(
            'Error loading products:',
            error
          );

          this.errorMessage.set(
            error?.error?.message ||
            'Unable to load products'
          );

          this.loading.set(false);

        }

      });

  }

}