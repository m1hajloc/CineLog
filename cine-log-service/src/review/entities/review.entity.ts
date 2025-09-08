import { IsInt, Max, Min } from "class-validator";
import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    @IsInt()
    @Min(1)
    @Max(10)
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(()=>User, (user)=>user.reviews)
    users: User

    @ManyToOne(()=>Movie, (movie)=>movie.reviews)
    movie: Movie
}
