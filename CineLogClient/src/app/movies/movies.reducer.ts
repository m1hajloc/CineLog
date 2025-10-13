import { createReducer, on } from '@ngrx/store';
import { getMovies, newMovie } from './movies.action';
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
  on(newMovie, (state, { movie }) => adapter.addOne(movie, state))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
