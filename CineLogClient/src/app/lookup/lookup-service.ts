import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store) {}

  getStatus(): Observable<Status[]> {
    return this.store.select(selectToken).pipe(
      take(1), // take the latest token once
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<Status[]>(`${this.apiUrl}status`, { headers });
      })
    );
  }
}
