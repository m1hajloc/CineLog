import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from './movies.selector';
import { MovieComponent } from '../movie/movie';
import { Filter, Genre, Movie } from '../contracts';
import { FormsModule } from '@angular/forms';
import { LookupService } from '../services/lookup.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MovieComponent, FormsModule],
  standalone: true,
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  constructor(private store: Store, private lookupService: LookupService) {}

  public movies: Movie[] = [];
  public filter: Filter = { genreId: 0, minRating: 0 };
  public genreOptions: Genre[] = [];

  public filteredMovies: Movie[] = [];

  async ngOnInit(): Promise<void> {
    this.store.select(selectMovies).subscribe((values) => {
      this.movies = values;
      this.applyFilter();
    });
    this.genreOptions = await this.lookupService.getGenre();
  }

  applyFilter() {
    if (!this.filter) return;
    console.log(this.movies);
    console.log(this.filter);
    this.filteredMovies = this.movies.filter((m) => {
      // Filter by genre
      const matchesGenre =
        !this.filter.genreId ||
        m.genres?.some((x) => x.genreId === this.filter.genreId);

      // Filter by rating (treat null as 0)
      const movieRating = m.average ?? 0;
      const matchesRating = movieRating >= this.filter.minRating;

      return matchesGenre && matchesRating;
    });
  }
}
