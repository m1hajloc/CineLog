import { createAction, props } from '@ngrx/store';
import { CreateMovie, Movie, Review } from '../contracts';

export const getMovies = createAction(
  '[Movies] Get',
  props<{ movies: Movie[] }>()
);

export const getOneMovie = createAction(
  '[Movies] Get One',
  props<{ movieId: number }>()
);

export const newMovie = createAction(
  '[Movies] New movie',
  props<{ movie: Movie }>()
);

export const createMovie = createAction(
  '[Movies] Create Movie',
  props<{ movie: CreateMovie }>()
);

export const upsertReviewSuccess = createAction(
  '[Movies] Update Review',
  props<{ updatedMovie: Movie}>()
);

export const createMovieSuccess = createAction(
  '[Movies] Create Movie Success',
  props<{ movie: Movie }>()
);

export const createMovieFailure = createAction(
  '[Movies] Create Movie Failure',
  props<{ error: string }>()
);
