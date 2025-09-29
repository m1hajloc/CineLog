import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Watchlist } from './watchlist/watchlist';
import { Reviews } from './reviews/reviews';
import { Movies } from './movies/movies';
import { Register } from './register/register';
import { Login } from './login/login';
import { MovieDetailed } from './movie-detailed/movie-detailed';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetailed },
  { path: 'movies', component: Movies },
  { path: 'watchlist', component: Watchlist },
  { path: 'reviews', component: Reviews },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }, // catch-all
];
