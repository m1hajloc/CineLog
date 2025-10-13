import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../contracts';
import { Watchlist } from '../services/watchlist.service';
import { Store } from '@ngrx/store';
import { selectMovie } from '../movies/movies.selector';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detailed',
  imports: [CommonModule],
  templateUrl: './movie-detailed.html',
  styleUrl: './movie-detailed.css',
})
export class MovieDetailed {
  movie$!: Observable<Movie | undefined>;
  // movie$!: Observable<Movie | undefined>;
  genreNames: string | null = null;
  WatchlistItemId?: number;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: Watchlist,
    private store: Store
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movie$ = this.store.select(selectMovie(+movieId));
      this.watchlistService.isInWatchlist(+movieId).subscribe((data) => {
        if (data.inWatchlist) this.WatchlistItemId = data.watchlistItemId;
      });
    }
  }

  async addToWatchlist() {
    const movie = await firstValueFrom(this.movie$);
    if (movie) {
      this.movieService.addMovieToWatchlist(movie.movieId).subscribe({
        next: (res) => (this.WatchlistItemId = res.watchlistItemId),
        error: (err) => console.error('Error adding to watchlist', err),
      });
    }
  }

  async removeFromWatchlist() {
    if (this.WatchlistItemId)
      await this.watchlistService.deleteFromWatchlist(this.WatchlistItemId);
    this.WatchlistItemId = undefined;
  }
}
