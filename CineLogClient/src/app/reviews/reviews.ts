import { Component, OnInit } from '@angular/core';
import { Review, Status } from '../contracts';
import { ReviewService } from '../services/review.service';
import { ReviewItem } from '../review-item/review-item';
import { CommonModule } from '@angular/common';
import { LookupService } from '../services/lookup.service';

@Component({
  selector: 'app-reviews',
  imports: [ReviewItem, CommonModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
  constructor(
    private service: ReviewService,
    private lookupService: LookupService
  ) {}

  public reviews!: Review[];
  public statusOptions!: Status[];

  async ngOnInit(): Promise<void> {
    this.statusOptions = await this.lookupService.getStatus();
    this.service.GetReviews().subscribe((data) => (this.reviews = data));
  }

  onItemRemoved(id: number) {
    console.log('1', id);
    this.reviews = this.reviews.filter((x) => x.reviewId !== id);
  }
}
