import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieComponent } from '../movie/movie';
import { MovieService } from '../movies/movie.service';
import { Store } from '@ngrx/store';
import { selectStatus } from '../movies/movies.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, MovieComponent, FormsModule],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist implements OnInit {
  public watchlist: WatchlistItem[] = [];
  public status: Status[] = [];
  public toRemove: number[] = [];
  constructor(private service: MovieService, private store: Store) {}

  ngOnInit(): void {
    this.service.getWatchlist().subscribe({
      next: (items) =>
        (this.watchlist = items.map((i) => ({
          ...i,
          statusId: i.statusId,
        }))),
      error: (err) => console.error('Failed to load watchlist', err),
    });

    this.store.select(selectStatus).subscribe((values) => {
      this.status = values;
    });
  }

  markForRemoval(item: WatchlistItem) {
    this.toRemove.push(item.movie.movieId);
    this.watchlist = this.watchlist.filter(
      (w) => w.movie.movieId !== item.movie.movieId
    );
  }

  saveChanges() {
    const updates = this.watchlist.map((item) => ({
      movieId: item.movie.movieId,
      statusId: item.statusId,
    }));

    this.service.saveWatchlistChanges(updates, this.toRemove).subscribe({
      next: () => {
        console.log('Watchlist saved successfully');
        this.toRemove = [];
      },
      error: (err: any) => console.error('Failed to save watchlist', err),
    });
  }
}
