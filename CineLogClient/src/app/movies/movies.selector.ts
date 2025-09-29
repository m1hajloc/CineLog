import { createFeatureSelector, createSelector } from '@ngrx/store';

// feature selector
export const selectMoviesState = createFeatureSelector<Movie[]>('movies');
export const selectStatusState = createFeatureSelector<Status[]>('status');

// selectors
export const selectMovies = createSelector(selectMoviesState, (state) => state);
export const selectStatus = createSelector(selectStatusState, (state) => state);
