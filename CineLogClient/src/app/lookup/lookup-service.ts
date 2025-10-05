import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, switchMap, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Status } from '../contracts';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store) {}

  private statuses!: Status[];

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
}
