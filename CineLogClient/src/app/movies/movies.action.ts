import { createAction, props } from '@ngrx/store';
import { Movie, Status } from '../contracts';

export const getMovies = createAction(
  '[Movies] Get',
  props<{ movies: Movie[] }>()
);

export const newMovie = createAction(
  '[Movies] New movie',
  props<{ movie: Movie }>()
);

export const getStatus = createAction(
  '[Status] Get',
  props<{ status: Status[] }>()
);
