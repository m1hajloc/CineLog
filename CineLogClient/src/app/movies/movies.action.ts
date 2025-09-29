import { createAction, props } from '@ngrx/store';

export const getMovies = createAction(
  '[Movies] Get',
  props<{ movies: Movie[] }>()
);

export const getStatus = createAction(
  '[Status] Get',
  props<{ status: Status[] }>()
);
