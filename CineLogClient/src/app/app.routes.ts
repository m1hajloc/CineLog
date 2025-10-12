import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Watchlist } from './watchlist/watchlist';
import { Reviews } from './reviews/reviews';
import { Movies } from './movies/movies';
import { Register } from './register/register';
import { Login } from './login/login';
import { MovieDetailed } from './movie-detailed/movie-detailed';
import { UpdateUser } from './update-user/update-user';
import { AddMovie } from './add-movie/add-movie';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetailed },
  { path: 'addMovie', component: AddMovie },
  { path: 'movies', component: Movies },
  { path: 'watchlist', component: Watchlist },
  { path: 'reviews', component: Reviews },
  { path: 'register', component: Register },
  { path: 'updateUser', component: UpdateUser },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' },
];
