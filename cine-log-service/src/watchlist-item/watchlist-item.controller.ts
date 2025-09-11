import { Controller, Get, Post, Param, Delete, UseGuards, Put } from '@nestjs/common';
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
  findAll( @GetUser() user: User) {
    return this.watchlistItemService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistItemService.findOneById(+id);
  }

  @Put(':id/:statusId')
  update(@Param('id') id: string, @Param('statusId') statusId: number) {
    return this.watchlistItemService.updateStatus(+id,statusId );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchlistItemService.remove(+id);
  }
}
