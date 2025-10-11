export class CreateMovieDto {
  title: string;
  releaseDate?: string;
  overview?: string;
  genres: number[];
  poster?: string;
}
