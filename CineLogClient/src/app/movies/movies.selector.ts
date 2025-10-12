import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie, Status } from '../contracts';

export const selectMoviesState = createFeatureSelector<Movie[]>('movies');
export const selectStatusState = createFeatureSelector<Status[]>('status');

export const selectMovies = createSelector(selectMoviesState, (state) => state);
export const selectStatus = createSelector(selectStatusState, (state) => state);
