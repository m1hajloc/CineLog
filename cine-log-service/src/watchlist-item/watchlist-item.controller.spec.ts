import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistItemController } from './watchlist-item.controller';
import { WatchlistItemService } from './watchlist-item.service';

describe('WatchlistItemController', () => {
  let controller: WatchlistItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchlistItemController],
      providers: [WatchlistItemService],
    }).compile();

    controller = module.get<WatchlistItemController>(WatchlistItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
