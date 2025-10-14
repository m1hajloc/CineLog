// movies.effects.ts
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import * as MoviesActions from './movies.action';
import { MovieService } from '../services/movie.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { createMovie } from './movies.action';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private movieService = inject(MovieService);
  private router = inject(Router);

  createMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMovie),
      switchMap(({ movie }) =>
        this.movieService.createMovie(movie).pipe(
          map((data) => MoviesActions.createMovieSuccess({ movie: data })),
          catchError((err) =>
            of(
              MoviesActions.createMovieFailure({
                error: err?.error?.message || 'Creation of movie failed.',
              })
            )
          )
        )
      )
    )
  );

  createMovieSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.createMovieSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );
}
