import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MovieService } from 'src/movie/movie.service';
import { StatusService } from 'src/status/status.service';
import { ReviewService } from 'src/review/review.service';
import { watch } from 'fs';

@Injectable()
export class WatchlistItemService {
  constructor(
    @InjectRepository(WatchlistItem)
    private wathclistItemRepository: Repository<WatchlistItem>,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private statusService: StatusService,
  ) {}

  async create(movieId: number, user: User) {
    let existingMovie = await this.movieService.findOneById(movieId);
    if (!existingMovie) throw new BadRequestException('Movie doesnt exist!');

    let initialStatus = await this.statusService.findOne(1);

    if (!initialStatus) throw new InternalServerErrorException('Bad request!');
    let watchlistItem = {
      movie: existingMovie,
      status: initialStatus,
      user: user,
    };
    const createdWatchlistItem =
      this.wathclistItemRepository.create(watchlistItem);
    await this.wathclistItemRepository.save(createdWatchlistItem);
    return createdWatchlistItem;
  }

  async findAll() {
    return await this.wathclistItemRepository.find({
      relations: ['movie', 'status'],
    });
  }
  async isInWatchlist(movieId: number, user: User) {
    var watchlist = await this.wathclistItemRepository.findOne({
      relations: ['movie', 'status'],
      where: {
        user: {
          userId: user.userId,
        },
        movie: {
          movieId: movieId,
        },
      },
    });
    return watchlist
      ? { inWatchlist: true, watchlistItemId: watchlist.watchlistItemId }
      : { inWatchlist: false };
  }

  async findByUser(user: User) {
    var watchlist = await this.wathclistItemRepository.find({
      relations: ['movie', 'status'],
      where: {
        user: {
          userId: user.userId,
        },
      },
    });
    var userReviews = await this.reviewService.findByUser(user);
    const combined = watchlist.map((w) => ({
      watchlistItem: w,
      review: userReviews.find((r) => r.movie.movieId === w.movie.movieId),
    }));

    return combined;
  }

  async findOneById(watchlistItemId: number) {
    return await this.wathclistItemRepository.findOne({
      relations: ['movie', 'status', 'user'],
      where: { watchlistItemId: watchlistItemId },
    });
  }

  async updateStatus(watchlistItemId: number, statusId: number) {
    const watchlistItem = await this.wathclistItemRepository.findOne({
      where: { watchlistItemId: watchlistItemId },
    });
    if (!watchlistItem) throw new NotFoundException('Review not found');

    const status = await this.statusService.findOne(statusId);

    if (!status) throw new BadRequestException('Status doesnt exist');

    watchlistItem.status = status;

    return this.wathclistItemRepository.save(watchlistItem);
  }

  async remove(id: number) {
    const existing = await this.findOneById(id);
    if (!existing) {
      throw new BadRequestException('Review with that id does not exist!');
    }

    await this.wathclistItemRepository.delete(id);
    return existing;
  }

  async getBestRated(user: User) {
    return (await this.findByUser(user))
      .map((data) => data.watchlistItem.movie)
      .sort((movie1, movie2) => {
        if (!movie1.average) return -1;
        if (!movie2.average) return 1;
        return movie1.average - movie2.average;
      }).slice(0, 5);
      
  }
}
