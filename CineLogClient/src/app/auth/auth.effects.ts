import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { getMovies } from '../movies/movies.action';
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private moviesService = inject(MovieService);

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
            this.authService.isLogedIn = true;
            this.authService.isAdmin = user.admin ? true : false;
            this.router.navigate(['/']);
            return loginSuccess({ token, user });
          }),
          catchError((err) =>
            of(loginFailure({ error: err.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      switchMap(() =>
        this.moviesService.getMovies().pipe(
          map((movies) => getMovies({ movies })),
          catchError((error) =>
            of(
              loginFailure({
                error: error.error?.message || 'Fetching movies failed',
              })
            )
          )
        )
      )
    )
  );
}
