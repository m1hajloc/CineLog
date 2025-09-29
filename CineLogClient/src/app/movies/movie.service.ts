import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store) {}

  getMovies(): Observable<Movie[]> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<Movie[]>(`${this.apiUrl}movie`, { headers });
      })
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<Movie>(`${this.apiUrl}movie/${id}`, { headers });
      })
    );
  }

  addMovieToWatchlist(id: number): Observable<WatchlistItem> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.post<WatchlistItem>(
          `${this.apiUrl}watchlist-item/${id}`,
          {},
          { headers }
        );
      })
    );
  }

  getWatchlist(): Observable<WatchlistItem[]> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<WatchlistItem[]>(`${this.apiUrl}watchlist-item`, {
          headers,
        });
      })
    );
  }

  saveWatchlistChanges(
    updates: {
      movieId: number;
      statusId: number;
    }[],
    toRemove: number[]
  ): Observable<WatchlistItem[]> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.post<WatchlistItem[]>(
          `${this.apiUrl}updateWatchlist`,
          { updates, toRemove },
          { headers }
        );
      })
    );
  }
}
