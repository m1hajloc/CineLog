import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { logout } from './auth.action';
import { loginDto, registerDto } from '../contracts';
import { User } from './auth.state';
import { selectToken } from './auth.selector';

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
  public isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  register(data: registerDto): Observable<any> {
    return this.http.post(`${this.apiUrl}user/register`, data);
  }

  updateUser(data: registerDto): Observable<any> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.put(`${this.apiUrl}user/update`, data, { headers });
      })
    );
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
    this.isLogedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  GetMe(): Observable<User> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<User>(
          `${this.apiUrl}user/me`,
          { headers } // options
        );
      })
    );
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
