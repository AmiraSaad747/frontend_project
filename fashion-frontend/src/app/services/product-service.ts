import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Product
} from '../models/product';


export interface ProductResponse {

  status: string;

  data: {
    product: Product;
  };

}


export interface ProductsListResponse {

  status: string;

  count: number;

  data: {
    products: Product[];
  };

}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http =
    inject(HttpClient);


  private baseUrl =
    'http://localhost:5000';


  // =========================
  // GET ALL PRODUCTS
  // OR BY CATEGORY
  // =========================

  getProducts(
    category?: string
  ): Observable<ProductsListResponse> {

    console.log(
      'Category sent to backend:',
      category
    );


    if (category) {

      return this.http.get<ProductsListResponse>(
        `${this.baseUrl}/products?category=${category}`
      );

    }


    return this.http.get<ProductsListResponse>(
      `${this.baseUrl}/products`
    );

  }


  // =========================
  // GET PRODUCT BY ID
  // =========================

  getProductById(
    id: string
  ): Observable<ProductResponse> {

    return this.http.get<ProductResponse>(
      `${this.baseUrl}/products/${id}`
    );

  }


  // =========================
  // IMAGE URL
  // =========================

  getImageUrl(
    imagePath?: string
  ): string {

    if (!imagePath) {

      return 'assets/placeholder.png';

    }


    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {

      return imagePath;

    }


    return `${this.baseUrl}/${
      imagePath.startsWith('/')
        ? imagePath.slice(1)
        : imagePath
    }`;

  }


  // =========================
  // CREATE PRODUCT
  // =========================

  createProduct(
    formData: FormData
  ): Observable<ProductResponse> {

    return this.http.post<ProductResponse>(
      `${this.baseUrl}/products`,
      formData
    );

  }


  // =========================
  // PURCHASE PRODUCT
  // DECREASE STOCK
  // =========================

  purchaseProduct(
    productId: string,
    quantity: number
  ): Observable<ProductResponse> {

    return this.http.post<ProductResponse>(

      `${this.baseUrl}/products/${productId}/purchase`,

      {
        quantity
      }

    );

  }

}