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

  selector: 'app-signin',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './signin.html',

  styleUrl: './signin.css'

})
export class Signin {

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

  signinForm =
    this.fb.nonNullable.group({

      name: [''],

      phone: [''],

      email: [''],

      password: ['']

    });


  // =====================================================
  // SELECT ROLE
  // =====================================================

  selectRole(role: string): void {

    this.selectedRole = role;

    this.errorMessage = '';

    this.successMessage = '';


    if (role === 'customer') {

      this.signinForm.controls.name.setValidators([
        Validators.required
      ]);


      this.signinForm.controls.phone.setValidators([
        Validators.required
      ]);


      this.signinForm.controls.email.clearValidators();

      this.signinForm.controls.password.clearValidators();


      this.signinForm.controls.email.setValue('');

      this.signinForm.controls.password.setValue('');

    }


    if (role === 'admin') {

      this.signinForm.controls.email.setValidators([
        Validators.required,
        Validators.email
      ]);


      this.signinForm.controls.password.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);


      this.signinForm.controls.name.clearValidators();

      this.signinForm.controls.phone.clearValidators();


      this.signinForm.controls.name.setValue('');

      this.signinForm.controls.phone.setValue('');

    }


    this.updateValidators();

  }


  // =====================================================
  // UPDATE VALIDATORS
  // =====================================================

  private updateValidators(): void {

    this.signinForm.controls.name
      .updateValueAndValidity();


    this.signinForm.controls.phone
      .updateValueAndValidity();


    this.signinForm.controls.email
      .updateValueAndValidity();


    this.signinForm.controls.password
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


    this.signinForm.reset();


    this.signinForm.controls.name.clearValidators();

    this.signinForm.controls.phone.clearValidators();

    this.signinForm.controls.email.clearValidators();

    this.signinForm.controls.password.clearValidators();


    this.updateValidators();

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  onSubmit(): void {

    console.log(
      'SIGN IN BUTTON CLICKED'
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

    if (this.signinForm.invalid) {

      console.log(
        'FORM IS INVALID'
      );

      this.signinForm.markAllAsTouched();

      return;

    }


    const formData =
      this.signinForm.getRawValue();


    this.loading = true;


    // =====================================================
    // CUSTOMER
    // =====================================================

    if (this.selectedRole === 'customer') {

      const loginData = {

        name: formData.name.trim(),

        phone: formData.phone.trim(),

        role: 'customer'

      };


      console.log(
        'CUSTOMER LOGIN DATA:',
        loginData
      );


      this.authService
        .login(loginData)
        .subscribe({

          next: (response) => {

            console.log(
              'CUSTOMER LOGIN SUCCESS:',
              response
            );


            this.loading = false;

            this.successMessage =
              'Customer login successful!';


            setTimeout(() => {

              this.router.navigate(['/']);

            }, 500);

          },


          error: (error) => {

            console.error(
              'CUSTOMER LOGIN ERROR:',
              error
            );


            this.loading = false;


            this.errorMessage =
              error.error?.message ||
              'Invalid name or phone';

          }

        });


      return;

    }


    // =====================================================
    // ADMIN
    // =====================================================

    if (this.selectedRole === 'admin') {

      const loginData = {

        email: formData.email.trim(),

        password: formData.password,

        role: 'admin'

      };


      console.log(
        'ADMIN LOGIN DATA:',
        loginData
      );


      this.authService
        .login(loginData)
        .subscribe({

          next: (response) => {

            console.log(
              'ADMIN LOGIN SUCCESS:',
              response
            );


            this.loading = false;

            this.successMessage =
              'Admin login successful!';


            setTimeout(() => {

              this.router.navigate(['/']);

            }, 500);

          },


          error: (error) => {

            console.error(
              'ADMIN LOGIN ERROR:',
              error
            );


            this.loading = false;


            this.errorMessage =
              error.error?.message ||
              'Invalid email or password';

          }

        });

    }

  }

}