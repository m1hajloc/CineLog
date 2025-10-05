import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';
import { Review } from '../contracts';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private store: Store, private http: HttpClient) {}
  private readonly apiUrl = 'http://localhost:3000/';
  leaveRating(review: Review): Observable<number> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.put<number>(
          `${this.apiUrl}review`,
          review, // body
          { headers } // options
        );
      })
    );
  }
}
