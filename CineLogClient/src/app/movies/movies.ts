import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from './movies.selector';
import { MovieComponent } from '../movie/movie';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MovieComponent],
  standalone: true,
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  
  constructor(private store: Store) {}

  public movies: Movie[] = [];

  ngOnInit(): void {
    this.store.select(selectMovies).subscribe((values) => {
      this.movies = values;
    });
  }
}
