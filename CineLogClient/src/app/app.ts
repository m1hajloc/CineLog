import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from './auth/auth.action';
import { MovieService } from './services/movie.service';
import { error } from 'console';
import { getMovies, getStatus } from './movies/movies.action';
import { LookupService } from './lookup/lookup-service';
import { Navbar } from '../navbar/navbar';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected readonly title = signal('CineLogClient');

  private moviesService = inject(MovieService);
  protected authService = inject(AuthService);
  private lookupService = inject(LookupService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const { user, token } = JSON.parse(savedAuth);
        this.store.dispatch(loginSuccess({ user, token }));
        console.log('User loaded from localStorage:', user);
        this.authService.isLogedIn = true;
      } else {
        console.log('No logged in user');
      }

      this.moviesService.getMovies().subscribe(
        (movies) => {
          this.store.dispatch(getMovies({ movies: movies }));
          console.log(movies);
        },
        (error) => {
          if (error.status === 401) this.router.navigate(['/login']);
          console.log(error);
        }
      );
    }
  }
}
