
import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000';


  
  // CURRENT USER SIGNAL
  

  private currentUser = signal<User | null>(
    this.getUserFromStorage()
  );


  
  // PUBLIC USER SIGNAL


  user = this.currentUser.asReadonly();


  
  // GET USER FROM LOCAL STORAGE
  

  private getUserFromStorage(): User | null {

    const user =
      localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {

      return JSON.parse(user);

    } catch {

      localStorage.removeItem('user');

      return null;

    }

  }

  // SIGN UP


  signup(userData: any): Observable<any> {

    return this.http
      .post<any>(
        `${this.apiUrl}/signup`,
        userData
      )
      .pipe(

        tap(response => {

          console.log(
            'SIGNUP RESPONSE:',
            response
          );

          if (response.data?.token) {

            localStorage.setItem(
              'token',
              response.data.token
            );

            localStorage.setItem(
              'user',
              JSON.stringify(
                response.data.user
              )
            );

            // Update Angular Signal
            this.currentUser.set(
              response.data.user
            );

          }

        })

      );

  }

  // LOGIN


  login(loginData: any): Observable<any> {

    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        loginData
      )
      .pipe(

        tap(response => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );

          if (response.data?.token) {

            localStorage.setItem(
              'token',
              response.data.token
            );

            localStorage.setItem(
              'user',
              JSON.stringify(
                response.data.user
              )
            );

            // Update Angular Signal immediately
            this.currentUser.set(
              response.data.user
            );

          }

        })

      );

  }

  // GET PROFILE
  

  getProfile(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/profile`
    );

  }


  // GET TOKEN
  

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }

  // GET USER
  

  getUser(): User | null {

    return this.currentUser();

  }

  // CHECK LOGIN
  

  isLoggedIn(): boolean {

    return this.currentUser() !== null;

  }

  // CHECK ADMIN
  

  isAdmin(): boolean {

    return this.currentUser()?.role === 'admin';

  }

  // LOGOUT
  

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

    // Update Signal immediately
    this.currentUser.set(null);

  }

}

