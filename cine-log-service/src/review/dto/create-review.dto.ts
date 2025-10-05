import { Movie } from "src/movie/entities/movie.entity";

export class CreateReviewDto {
  rating: number;
  movie: Movie;
  comment: string;
}
