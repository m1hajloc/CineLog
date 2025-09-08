import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistItemService } from './watchlist-item.service';

describe('WatchlistItemService', () => {
  let service: WatchlistItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchlistItemService],
    }).compile();

    service = module.get<WatchlistItemService>(WatchlistItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
