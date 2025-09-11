import { Genre } from "src/genre/entities/genre.entity";
import { Review } from "src/review/entities/review.entity";
import { WatchlistItem } from "src/watchlist-item/entities/watchlist-item.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    movieId: number;

    @Column({unique: true})
    title: string;

    @Column()
    releaseDate: Date;

    @Column('decimal', { precision: 3, scale: 1, nullable: true } ) 
    average?: number;
    
    @Column({nullable:true})
    overview?: string;

    @OneToMany(()=>Review,(review)=>review.movie, {nullable:true})
        reviews?: Review[];

    @OneToMany(()=>WatchlistItem,(watchlistItem)=>watchlistItem.movie, {nullable:true})
        watchlistItems?: WatchlistItem[];

    @ManyToMany(()=>Genre,(genre)=>genre.movies)
    @JoinTable()
        genres?: Genre[];
    
    // @Column()
    // picture: string;
}
