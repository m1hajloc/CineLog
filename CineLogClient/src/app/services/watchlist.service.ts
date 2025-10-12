import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, switchMap, take } from 'rxjs';
import { isInWatchlistDTO, Movie, WatchlistItem } from '../contracts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from '../auth/auth.selector';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Watchlist {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  updateStatus(
    watchlistItemId: number,
    statusId: number
  ): Observable<WatchlistItem> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.put<WatchlistItem>(
          `${this.apiUrl}watchlist-item/${watchlistItemId}/${statusId}`,
          null,
          { headers }
        );
      })
    );
  }

  isInWatchlist(movieId: number): Observable<isInWatchlistDTO> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<isInWatchlistDTO>(
          `${this.apiUrl}watchlist-item/isInWatchlist/${movieId}`,
          { headers }
        );
      })
    );
  }

  async deleteFromWatchlist(watchlistItemId: number): Promise<WatchlistItem> {
    const token = await firstValueFrom(
      this.store.select(selectToken).pipe(take(1))
    );

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return firstValueFrom(
      this.http.delete<WatchlistItem>(
        `${this.apiUrl}watchlist-item/${watchlistItemId}`,
        { headers }
      )
    );
  }

  getWatchlistBestRated(): Observable<Movie[]> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<Movie[]>(`${this.apiUrl}watchlist-item/bestRated`, { headers });
      })
    );
  }
}
