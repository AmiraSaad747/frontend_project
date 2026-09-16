
import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ProductService } from '../../services/product-service';


@Component({
  selector: 'app-add-product',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './add-product.html',

  styleUrl: './add-product.css'
})
export class AddProduct {

  private fb = inject(FormBuilder);

  private productService = inject(ProductService);


  loading = false;

  successMessage = '';

  errorMessage = '';


  productForm = this.fb.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],


    description: [
      '',
      Validators.required
    ],


    price: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],


    category: [
      '',
      Validators.required
    ],


    // =========================
    // SIZE
    // =========================

    size: [
      '',
      Validators.required
    ],


    stock: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],


    image: [
      null as File | null
    ]

  });


  // =========================
  // IMAGE
  // =========================

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (
      input.files &&
      input.files.length > 0
    ) {

      const file = input.files[0];


      this.productForm.controls.image.setValue(
        file
      );

    }

  }


  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    this.successMessage = '';

    this.errorMessage = '';


    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }


    this.loading = true;


    const formData = new FormData();


    // =========================
    // PRODUCT NAME
    // =========================

    formData.append(
      'name',
      this.productForm.controls.name.value || ''
    );


    // =========================
    // DESCRIPTION
    // =========================

    formData.append(
      'description',
      this.productForm.controls.description.value || ''
    );


    // =========================
    // PRICE
    // =========================

    formData.append(
      'price',
      String(
        this.productForm.controls.price.value || 0
      )
    );


    // =========================
    // CATEGORY
    // =========================

    formData.append(
      'category',
      this.productForm.controls.category.value || ''
    );


    // =========================
    // SIZE
    // =========================

    formData.append(
      'size',
      this.productForm.controls.size.value || ''
    );


    // =========================
    // STOCK
    // =========================

    formData.append(
      'stock',
      String(
        this.productForm.controls.stock.value || 0
      )
    );


    // =========================
    // IMAGE
    // =========================

    const image =
      this.productForm.controls.image.value;


    if (image) {

      formData.append(
        'image',
        image
      );

    }


    console.log(
      'Sending product...'
    );


    this.productService
      .createProduct(formData)
      .subscribe({

        next: (response) => {

          console.log(
            'Product created:',
            response
          );


          this.successMessage =
            'Product added successfully!';


          this.loading = false;


          // =========================
          // RESET FORM
          // =========================

          this.productForm.reset({

            name: '',

            description: '',

            price: 0,

            category: '',

            size: '',

            stock: 0,

            image: null

          });

        },


        error: (error) => {

          console.error(
            'Create product error:',
            error
          );


          this.errorMessage =
            error?.error?.message ||
            'Unable to add product. Please try again.';


          this.loading = false;

        }

      });

  }

}

