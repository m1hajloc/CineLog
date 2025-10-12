import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.action';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((res) => {
            const token = res.access_token;
            const decoded = this.authService.decodeToken(token);
            const user = {
              id: decoded.sub,
              username: decoded.username,
              email: decoded.email,
              admin: decoded.admin,
            };
            localStorage.setItem('auth', JSON.stringify({ token, user }));
            this.router.navigate(['/']);
            this.authService.isLogedIn = true;
            return loginSuccess({ token, user });
          }),
          catchError((err) =>
            of(loginFailure({ error: err.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );
}
