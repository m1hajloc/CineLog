import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, switchMap, take } from 'rxjs';
import { selectToken } from '../auth/auth.selector';
import { Review } from '../contracts';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private store: Store, private http: HttpClient) {}
  private readonly apiUrl = environment.apiUrl;

  leaveRating(review: Review): Observable<number> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.put<number>(`${this.apiUrl}review`, review, {
          headers,
        });
      })
    );
  }

  GetReviews(): Observable<Review[]> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return this.http.get<Review[]>(`${this.apiUrl}review`, { headers });
      })
    );
  }

  async deleteReview(reviewId: number): Promise<Review> {
    const token = await firstValueFrom(
      this.store.select(selectToken).pipe(take(1))
    );

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return firstValueFrom(
      this.http.delete<Review>(`${this.apiUrl}review/${reviewId}`, { headers })
    );
  }
}
