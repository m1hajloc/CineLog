import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Watchlist } from '../services/watchlist.service';
import { forkJoin } from 'rxjs';
import { Movie } from '../contracts';
import { MovieComponent } from '../movie/movie';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MovieComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  bestRatedMovies!: Movie[];
  watchlistMovies!: Movie[];
  constructor(
    private movieService: MovieService,
    private watchlistService: Watchlist,
    private router: Router,
  ) {}
  ngOnInit(): void {
    forkJoin({
      bestRatedData: this.movieService.getBestRated(),
      watchlistData: this.watchlistService.getWatchlistBestRated(),
    }).subscribe(({ bestRatedData, watchlistData }) => {
      this.bestRatedMovies = bestRatedData;
      this.watchlistMovies = watchlistData;
    });
  }
  goToMovie() {
    this.router.navigate(['/movies']);
  }
}
