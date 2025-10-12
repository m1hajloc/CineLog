import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre, Status } from '../contracts';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  private statuses!: Status[];
  private genres!: Genre[];

  async getStatus(): Promise<Status[]> {
    if (this.statuses) return this.statuses;
    else {
      const token = await firstValueFrom(
        this.store.select(selectToken).pipe(take(1))
      );

      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      return firstValueFrom(
        this.http.get<Status[]>(`${this.apiUrl}status`, { headers })
      ).then((data) => {
        this.statuses = data;
        return data;
      });
    }
  }

  async getGenre(): Promise<Genre[]> {
    if (this.genres) return this.genres;
    else {
      const token = await firstValueFrom(
        this.store.select(selectToken).pipe(take(1))
      );

      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      return firstValueFrom(
        this.http.get<Genre[]>(`${this.apiUrl}genre`, { headers })
      ).then((data) => {
        this.genres = data;
        return data;
      });
    }
  }
}
