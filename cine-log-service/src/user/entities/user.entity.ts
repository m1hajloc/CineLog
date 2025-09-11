import { Review } from 'src/review/entities/review.entity';
import { WatchlistItem } from 'src/watchlist-item/entities/watchlist-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => WatchlistItem, (watchlistItem) => watchlistItem.user)
  watchlistItems: WatchlistItem[];
}
