import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormsModule } from '@angular/forms';
import { Status, WatchlistItemAndReview } from '../contracts';
import { WatchlistItemComponent } from '../watchlist-item/watchlist-item';
import { LookupService } from '../services/lookup.service';

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
    private lookupService: LookupService
  ) {}
  protected statusOptions!: Status[];
  async ngOnInit() {
    this.statusOptions = await this.lookupService.getStatus();

    this.service.getWatchlist().subscribe({
      next: (items) => {
        this.watchlist = items;
      },
      error: (err) => console.error('Failed to load watchlist', err),
    });
  }

  onItemRemoved(id: number) {
    this.watchlist = this.watchlist.filter(
      (x) => x.watchlistItem.watchlistItemId !== id
    );
  }
}
