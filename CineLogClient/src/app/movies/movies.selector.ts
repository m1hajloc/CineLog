import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState, selectAll } from './movies.reducer';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(selectMoviesState, selectAll);
export const selectMovie = (movieId: number) =>
  createSelector(selectMoviesState, (state) => state.entities[movieId]);
