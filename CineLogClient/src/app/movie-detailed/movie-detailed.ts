import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detailed',
  imports: [CommonModule],
  templateUrl: './movie-detailed.html',
  styleUrl: './movie-detailed.css',
})
export class MovieDetailed {
  movie!: Movie;
  genreNames: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovie(+movieId).subscribe((m) => {
        this.movie = m;
        if (this.movie && this.movie.genres)
          this.genreNames = this.movie.genres.map((g) => g.name).join(', ');
      });
    }
  }

  addToWatchlist() {
    this.movieService.addMovieToWatchlist(this.movie.movieId).subscribe({
      next: (res) => console.log('Added to watchlist', res),
      error: (err) => console.error('Error adding to watchlist', err),
    });
  }
}
