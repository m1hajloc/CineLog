import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { WatchlistItemService } from './watchlist-item.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('watchlist-item')
export class WatchlistItemController {
  constructor(private readonly watchlistItemService: WatchlistItemService) {}

  @Post(':movieId')
  create(@Param('movieId') movieId: number, @GetUser() user: User) {
    return this.watchlistItemService.create(movieId, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.watchlistItemService.findByUser(user);
  }

  @Get('bestRated')
  getBestRated(@GetUser() user: User) {
    return this.watchlistItemService.getBestRated(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistItemService.findOneById(+id);
  }

  @Get('isInWatchlist/:movieId')
  isInWatchlist(@Param('movieId') movieId: string, @GetUser() user: User) {
    return this.watchlistItemService.isInWatchlist(+movieId, user);
  }

  @Put(':id/:statusId')
  update(@Param('id') id: string, @Param('statusId') statusId: number) {
    return this.watchlistItemService.updateStatus(+id, statusId);
  }

  @Delete(':wathclistItemId')
  async remove(@Param('wathclistItemId') wathclistItemId: string) {
    return await this.watchlistItemService.remove(+wathclistItemId);
  }
}
