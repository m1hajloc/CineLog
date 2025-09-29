import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { loginFailure, loginSuccess, logout } from './auth.action';

interface JwtPayload {
  sub: string; // user id
  username: string;
  email: string;
  admin?: boolean;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/'; // 👈 change this
  public isLogedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  register(data: registerDto): Observable<any> {
    return this.http.post(`${this.apiUrl}user/register`, data);
  }

  login(data: loginDto): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.apiUrl}auth/login`,
      data
    );
  }

  decodeToken(token: string) {
    return jwtDecode<JwtPayload>(token);
  }

  logout() {
    localStorage.removeItem('auth');
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
