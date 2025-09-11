import { Module } from '@nestjs/common';
import { WatchlistItemService } from './watchlist-item.service';
import { WatchlistItemController } from './watchlist-item.controller';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from 'src/movie/movie.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchlistItem]),
    MovieModule,
    StatusModule,
  ],
  controllers: [WatchlistItemController],
  providers: [WatchlistItemService],
})
export class WatchlistItemModule {}
