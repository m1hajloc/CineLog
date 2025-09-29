import { createReducer, on } from '@ngrx/store';
import { getMovies, getStatus } from './movies.action';

export const initialState: Movie[] = [];
export const initialStateStatus: Status[] = [];

export const movieReducer = createReducer(
  initialState,
  on(getMovies, (state, { movies }) => movies)
);

export const statusReducer = createReducer(
  initialStateStatus,
  on(getStatus, (state, { status }) => status)
);
