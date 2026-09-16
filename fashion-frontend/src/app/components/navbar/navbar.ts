
import {
  Component,
  inject
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../services/auth-service';


@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'
})
export class Navbar {

  authService = inject(AuthService);


  // =====================================================
  // LOGGED IN USER
  // =====================================================

  get user() {

    return this.authService.user();

  }


  // =====================================================
  // LOGIN STATE
  // =====================================================

  get isLoggedIn(): boolean {

    return this.authService.isLoggedIn();

  }


  // =====================================================
  // ADMIN STATE
  // =====================================================

  get isAdmin(): boolean {

    return this.authService.isAdmin();

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout(): void {

    this.authService.logout();

  }

}

