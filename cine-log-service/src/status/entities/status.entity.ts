import { WatchlistItem } from "src/watchlist-item/entities/watchlist-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    statusId: number;

    @Column({unique:true})
    name: string;

    @OneToMany(()=>WatchlistItem,(watchlistItem)=>watchlistItem.status)
    watchlistItems: WatchlistItem[];
}
