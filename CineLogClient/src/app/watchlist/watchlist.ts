import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Status, WatchlistItem, WatchlistItemAndReview } from '../contracts';
import { WatchlistItemComponent } from '../watchlist-item/watchlist-item';
import { LookupService } from '../lookup/lookup-service';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, FormsModule, WatchlistItemComponent],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist implements OnInit {
  public watchlist: WatchlistItemAndReview[] = [];
  constructor(
    private service: MovieService,
    // private store: Store,
    private lookupService: LookupService
  ) {}
  protected statusOptions!: Status[];
  async ngOnInit() {
    this.statusOptions = await this.lookupService.getStatus();

    this.service.getWatchlist().subscribe({
      next: (items) => {
        this.watchlist = items;
        console.log(items);
      },
      error: (err) => console.error('Failed to load watchlist', err),
    });
  }

  onItemRemoved(id: number) {
    this.watchlist = this.watchlist.filter(
      (x) => x.watchlistItem.watchlistItemId !== id
    );
  }

  // saveChanges() {
  //   const updates = this.watchlist.map((item) => ({
  //     movieId: item.movie.movieId,
  //     statusId: item.statusId,
  //   }));

  //   this.service.saveWatchlistChanges(updates, this.toRemove).subscribe({
  //     next: () => {
  //       console.log('Watchlist saved successfully');
  //       this.toRemove = [];
  //     },
  //     error: (err: any) => console.error('Failed to save watchlist', err),
  //   });
  // }
}
