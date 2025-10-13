import { createAction, props } from '@ngrx/store';
import { Movie } from '../contracts';

export const getMovies = createAction(
  '[Movies] Get',
  props<{ movies: Movie[] }>()
);

export const getOneMovie = createAction(
  '[Movies] Get One',
  props<{ movieId:number }>()
);

export const newMovie = createAction(
  '[Movies] New movie',
  props<{ movie: Movie }>()
);
