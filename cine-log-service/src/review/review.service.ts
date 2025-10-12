import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Review } from './entities/review.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private movieService: MovieService,
  ) {}

  async upsert(review: CreateReviewDto, user: User) {
    let existing = await this.findByMovieAndUser(
      review.movie.movieId,
      user.userId,
    );
    if (existing) {
      existing.comment = review.comment;
      existing.rating = review.rating;
    } else {
      let newReview = {
        movie: review.movie,
        rating: review.rating,
        comment: review.comment,
        user: user,
      };
      existing = this.reviewRepository.create(newReview);
    }

    await this.reviewRepository.save(existing);
    var movie = await this.movieService.updateMovieAverage(
      review.movie,
      await this.findByMovie(review.movie.movieId),
    );

    return movie.average;
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findByMovie(movieId: number) {
    return await this.reviewRepository.find({
      where: {
        movie: {
          movieId: movieId,
        },
      },
    });
  }
  async findByMovieAndUser(movieId: number, userId: number) {
    return await this.reviewRepository.findOne({
      where: {
        movie: {
          movieId: movieId,
        },
        user: {
          userId: userId,
        },
      },
    });
  }

  async findOneById(reviewId: number) {
    return await this.reviewRepository.findOne({
      relations: ['movie'],
      where: { reviewId: reviewId },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: { reviewId: id },
    });

    if (!review) throw new NotFoundException('Review not found');

    Object.assign(review, updateReviewDto);

    const toReturn = await this.reviewRepository.save(review);

    if (review)
      await this.movieService.updateMovieAverage(
        review.movie,
        await this.findByMovie(review.movie.movieId),
      );

    return toReturn;
  }

  async remove(id: number) {
    const existing = await this.findOneById(id);
    if (!existing)
      throw new BadRequestException('Review with that id does not exist!');
    else await this.reviewRepository.delete(id);

    await this.movieService.updateMovieAverage(
      existing.movie,
      await this.findByMovie(existing.movie.movieId),
    );

    return existing;
  }

  async findByUser(user: User) {
    var reviews = await this.reviewRepository.find({
      relations: ['movie'],
      where: {
        user: {
          userId: user.userId,
        },
      },
    });
    return reviews;
  }
}
