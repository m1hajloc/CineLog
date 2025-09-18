import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = 'http://localhost:3000/'; // 👈 change this

  constructor(private http: HttpClient, private router: Router) {}

  register(data: registerDto): Observable<any> {
    return this.http.post(`${this.apiUrl}user/register`, data);
  }
  login(data: loginDto): Observable<any> {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}auth/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
