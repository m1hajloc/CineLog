import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review, Status } from '../contracts';
import { ReviewService } from '../services/review.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-review-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './review-item.html',
  styleUrl: './review-item.css',
})
export class ReviewItem {
  constructor(private service: ReviewService) {}

  ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Output() removed = new EventEmitter<number>();

  @Input({ required: true })
  public review!: Review;

  @Input({ required: true })
  public statusOptions!: Status[];

  reviewModal: any;

  async remove() {
    if (this.review.reviewId) {
      await this.service.deleteReview(this.review.reviewId);
      console.log('1', this.review.reviewId);
      this.removed.emit(this.review.reviewId);
    }
  }

  openCommentModal() {
    const modalElement = document.getElementById(
      `reviewModal-${this.review.reviewId}`
    );
    if (!modalElement) return;
    this.reviewModal = new bootstrap.Modal(modalElement);
    this.reviewModal.show();
  }

  leaveRating() {
    this.service.leaveRating(this.review).subscribe((newAverage) => {
      if (this.review.movie) this.review.movie.average = newAverage;
      this.reviewModal.hide();
    });
  }
}
