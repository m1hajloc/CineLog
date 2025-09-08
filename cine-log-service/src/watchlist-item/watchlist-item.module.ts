import { Module } from '@nestjs/common';
import { WatchlistItemService } from './watchlist-item.service';
import { WatchlistItemController } from './watchlist-item.controller';

@Module({
  controllers: [WatchlistItemController],
  providers: [WatchlistItemService],
})
export class WatchlistItemModule {}
