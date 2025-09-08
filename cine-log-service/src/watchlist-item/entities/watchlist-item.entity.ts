import { Movie } from "src/movie/entities/movie.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WatchlistItem {
    @PrimaryGeneratedColumn()
    watchlistItemId: number;

    @ManyToOne(()=>Status,(status)=>status.watchlistItems)
    status: Status;

    @ManyToOne(()=>User,(user)=>user.watchlistItems)
    user: User;

    @ManyToMany(()=>Movie,(movie)=>movie.watchlistItems)
    @JoinTable()
    movies: Movie[];

}
