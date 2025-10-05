import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Review,
  Status,
  WatchlistItem,
  WatchlistItemAndReview,
} from '../contracts';
import { Watchlist } from '../services/watchlist';
import { ReviewService } from '../services/review';

declare var bootstrap: any;

@Component({
  selector: 'app-watchlist-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './watchlist-item.html',
  styleUrl: './watchlist-item.css',
})
export class WatchlistItemComponent implements OnInit {
  comment!: string;
  rating!: number;
  ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private service: Watchlist,
    private reviewService: ReviewService
  ) {}
  ngOnInit(): void {
    if (this.watchlistItemAndReview.review) {
      this.comment = this.watchlistItemAndReview.review.comment;
      this.rating = this.watchlistItemAndReview.review.rating;
    }
  }
  @Input({ required: true })
  watchlistItemAndReview!: WatchlistItemAndReview;

  @Input({ required: true })
  public statusOptions!: Status[];

  @Output() removed = new EventEmitter<number>();

  public selectedStatus!: number;
  statusModal: any;
  commentModal: any;

  openStatusModal() {
    const modalElement = document.getElementById(
      `statusModal-${this.watchlistItemAndReview.watchlistItem.watchlistItemId}`
    );
    if (!modalElement) return;
    this.statusModal = new bootstrap.Modal(modalElement);
    this.statusModal.show();
  }

  changeStatus() {
    this.service
      .updateStatus(
        this.watchlistItemAndReview.watchlistItem.watchlistItemId,
        this.selectedStatus
      )
      .subscribe(
        (status) =>
          (this.watchlistItemAndReview.watchlistItem.status = status.status)
      );
    // TODO: call service to save status
    this.statusModal.hide();
  }
  openCommentModal() {
    const modalElement = document.getElementById(
      `commentModal-${this.watchlistItemAndReview.watchlistItem.watchlistItemId}`
    );
    if (!modalElement) return;
    this.commentModal = new bootstrap.Modal(modalElement);
    this.commentModal.show();
  }
  async remove() {
    await this.service.deleteFromWatchlist(
      this.watchlistItemAndReview.watchlistItem.watchlistItemId
    );
    this.removed.emit(
      this.watchlistItemAndReview.watchlistItem.watchlistItemId
    );
  }
  leaveRating() {
    var review: Review = {
      comment: this.comment,
      rating: this.rating,
      movie: this.watchlistItemAndReview.watchlistItem.movie,
    };
    this.reviewService.leaveRating(review).subscribe((newAverage) => {
      this.watchlistItemAndReview.watchlistItem.movie.average = newAverage;
      this.commentModal.hide();
    });
  }
}
