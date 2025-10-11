import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from './auth/auth.action';
import { MovieService } from './services/movie.service';
import { getMovies } from './movies/movies.action';
import { Navbar } from './navbar/navbar';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './auth/auth.state';
import { LookupService } from './services/lookup.service';

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
  private store = inject(Store);
  private router = inject(Router);
  public user!: User;

  async ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const { user, token } = JSON.parse(savedAuth);
        this.store.dispatch(loginSuccess({ user, token }));
        console.log('User loaded from localStorage:', user);
        this.user = user;
        console.log(this.user.admin);
        this.authService.isAdmin = this.user.admin;
        this.authService.isLogedIn = true;

        this.moviesService.getMovies().subscribe({
          next: (movies) => {
            this.store.dispatch(getMovies({ movies: movies }));
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
