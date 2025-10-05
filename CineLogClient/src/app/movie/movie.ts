import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Movie } from '../contracts';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html',
  styleUrls: ['./movie.css'],
  imports: [CommonModule],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;
  genreNames: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.movie.genres && this.movie.genres.length > 0) {
      this.genreNames = this.movie.genres.map((g) => g.name).join(', ');
    }
  }

  openDetails(): void {
    // Navigate to movie detail page
    this.router.navigate(['/movie', this.movie.movieId]);
  }
}
