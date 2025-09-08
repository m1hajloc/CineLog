import { Movie } from "src/movie/entities/movie.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    genreId: number;

    @Column({unique:true})
    name: string;

    @ManyToMany(()=>Movie,(movie)=>movie.genres)
    movies: Movie[];
}
