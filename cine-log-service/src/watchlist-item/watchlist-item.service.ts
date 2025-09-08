import { Injectable } from '@nestjs/common';
import { CreateWatchlistItemDto } from './dto/create-watchlist-item.dto';
import { UpdateWatchlistItemDto } from './dto/update-watchlist-item.dto';

@Injectable()
export class WatchlistItemService {
  create(createWatchlistItemDto: CreateWatchlistItemDto) {
    return 'This action adds a new watchlistItem';
  }

  findAll() {
    return `This action returns all watchlistItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} watchlistItem`;
  }

  update(id: number, updateWatchlistItemDto: UpdateWatchlistItemDto) {
    return `This action updates a #${id} watchlistItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchlistItem`;
  }
}
