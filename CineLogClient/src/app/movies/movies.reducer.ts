import { createReducer, on } from '@ngrx/store';
import {
  createMovieSuccess,
  getMovies,
  newMovie,
  upsertReviewSuccess,
} from './movies.action';
import { Movie } from '../contracts';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface MoviesState extends EntityState<Movie> {}

export const adapter = createEntityAdapter<Movie>({
  selectId: (movie) => movie.movieId,
});

export const initialState: MoviesState = adapter.getInitialState();

export const movieReducer = createReducer(
  initialState,
  on(getMovies, (state, { movies }) => adapter.setAll(movies, state)),
  on(createMovieSuccess, (state, { movie }) => adapter.addOne(movie, state)),
  on(upsertReviewSuccess, (state, { updatedMovie }) => {
    const movie = state.entities[updatedMovie.movieId];
    if (!movie) return state;

    return adapter.updateOne({ id: movie.movieId, changes: updatedMovie }, state);
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
