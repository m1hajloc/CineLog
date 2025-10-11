import { createReducer, on } from '@ngrx/store';
import { getMovies, getStatus, newMovie } from './movies.action';
import { Movie, Status } from '../contracts';

export const initialState: Movie[] = [];
export const initialStateStatus: Status[] = [];

export const movieReducer = createReducer(
  initialState,
  on(getMovies, (state, { movies }) => movies),
  on(newMovie, (state, { movie }) => [...state, movie])
);

export const statusReducer = createReducer(
  initialStateStatus,
  on(getStatus, (state, { status }) => status)
);
