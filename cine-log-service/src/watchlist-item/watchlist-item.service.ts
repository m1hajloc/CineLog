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

@Injectable()
export class WatchlistItemService {
  constructor(
    @InjectRepository(WatchlistItem)
    private wathclistItemRepository: Repository<WatchlistItem>,
    private movieService: MovieService,
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

  async findByUser(user: User) {
    return await this.wathclistItemRepository.find({
      relations: ['movie', 'status'],
      where: {
        user: {
          userId: user.userId,
        },
      },
    });
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

    const status = this.statusService.findOne(statusId);

    if (!status) throw new BadRequestException('Status doesnt exist');

    Object.assign(watchlistItem, status);

    return this.wathclistItemRepository.save(watchlistItem);
  }

  async remove(id: number) {
    const existing = await this.findOneById(id);
    if (!existing)
      throw new BadRequestException('Review with that id does not exist!');
    else this.wathclistItemRepository.remove(existing);
  }
}
