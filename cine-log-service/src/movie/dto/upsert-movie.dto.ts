export class UpsertMovieDto {
  title: string;
  releaseDate?: string;
  overview?: string;
  genres: number[];
  poster?: string;
}
