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
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../services/auth-service';


@Component({

  selector: 'app-signup',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './signup.html',

  styleUrl: './signup.css'

})
export class Signup {

  private fb =
    inject(FormBuilder);


  private authService =
    inject(AuthService);


  private router =
    inject(Router);


  errorMessage = '';

  successMessage = '';

  selectedRole = '';

  loading = false;


  // =====================================================
  // FORM
  // =====================================================

  signupForm =
    this.fb.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [''],

      phone: ['']

    });


  // =====================================================
  // SELECT ROLE
  // =====================================================

  selectRole(role: string): void {

    this.selectedRole = role;

    this.errorMessage = '';

    this.successMessage = '';


    if (role === 'customer') {

      this.signupForm.controls.phone.setValidators([
        Validators.required
      ]);


      this.signupForm.controls.password.clearValidators();

      this.signupForm.controls.password.setValue('');

    }


    if (role === 'admin') {

      this.signupForm.controls.password.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);


      this.signupForm.controls.phone.clearValidators();

      this.signupForm.controls.phone.setValue('');

    }


    this.signupForm.controls.password
      .updateValueAndValidity();


    this.signupForm.controls.phone
      .updateValueAndValidity();

  }


  // =====================================================
  // CHANGE ROLE
  // =====================================================

  changeRole(): void {

    this.selectedRole = '';

    this.errorMessage = '';

    this.successMessage = '';

    this.loading = false;


    this.signupForm.reset();


    this.signupForm.controls.password.clearValidators();

    this.signupForm.controls.phone.clearValidators();


    this.signupForm.controls.password
      .updateValueAndValidity();


    this.signupForm.controls.phone
      .updateValueAndValidity();

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  onSubmit(): void {

    console.log(
      'SIGN UP BUTTON CLICKED'
    );


    this.errorMessage = '';

    this.successMessage = '';


    // =========================
    // ROLE
    // =========================

    if (!this.selectedRole) {

      this.errorMessage =
        'Please choose Customer or Admin';

      return;

    }


    // =========================
    // FORM
    // =========================

    if (this.signupForm.invalid) {

      console.log(
        'SIGN UP FORM INVALID'
      );

      this.signupForm.markAllAsTouched();

      return;

    }


    const formData =
      this.signupForm.getRawValue();


    this.loading = true;


    // =====================================================
    // CUSTOMER
    // =====================================================

    if (this.selectedRole === 'customer') {

      const signupData = {

        name: formData.name.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        role: 'customer'

      };


      console.log(
        'CUSTOMER SIGNUP DATA:',
        signupData
      );


      this.authService
        .signup(signupData)
        .subscribe({

          next: (response) => {

            console.log(
              'CUSTOMER SIGNUP SUCCESS:',
              response
            );


            this.loading = false;

            this.successMessage =
              'Customer account created successfully!';


            setTimeout(() => {

              this.router.navigate(['/']);

            }, 1000);

          },


          error: (error) => {

            console.error(
              'CUSTOMER SIGNUP ERROR:',
              error
            );


            this.loading = false;


            this.errorMessage =
              error.error?.message ||
              'Something went wrong';

          }

        });


      return;

    }


    // =====================================================
    // ADMIN
    // =====================================================

    if (this.selectedRole === 'admin') {

      const signupData = {

        name: formData.name.trim(),

        email: formData.email.trim(),

        password: formData.password,

        role: 'admin'

      };


      console.log(
        'ADMIN SIGNUP DATA:',
        signupData
      );


      this.authService
        .signup(signupData)
        .subscribe({

          next: (response) => {

            console.log(
              'ADMIN SIGNUP SUCCESS:',
              response
            );


            this.loading = false;

            this.successMessage =
              'Admin account created successfully!';


            setTimeout(() => {

              this.router.navigate(['/']);

            }, 1000);

          },


          error: (error) => {

            console.error(
              'ADMIN SIGNUP ERROR:',
              error
            );


            this.loading = false;


            this.errorMessage =
              error.error?.message ||
              'Something went wrong';

          }

        });

    }

  }

}