import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../contracts';
import { Watchlist } from '../services/watchlist.service';

@Component({
  selector: 'app-movie-detailed',
  imports: [CommonModule],
  templateUrl: './movie-detailed.html',
  styleUrl: './movie-detailed.css',
})
export class MovieDetailed {
  movie!: Movie;
  genreNames: string | null = null;
  WatchlistItemId?: number;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: Watchlist
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovie(+movieId).subscribe((m) => {
        this.movie = m;
        if (this.movie && this.movie.genres)
          this.genreNames = this.movie.genres.map((g) => g.name).join(', ');
      });
      this.watchlistService.isInWatchlist(+movieId).subscribe((data) => {
        if (data.inWatchlist) this.WatchlistItemId = data.watchlistItemId;
      });
    }
  }

  addToWatchlist() {
    this.movieService.addMovieToWatchlist(this.movie.movieId).subscribe({
      next: (res) => (this.WatchlistItemId = res.watchlistItemId),
      error: (err) => console.error('Error adding to watchlist', err),
    });
  }
  async removeFromWatchlist() {
    if (this.WatchlistItemId)
      await this.watchlistService.deleteFromWatchlist(this.WatchlistItemId);
    this.WatchlistItemId = undefined;
  }
}
