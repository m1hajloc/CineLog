interface registerDto {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;
}
interface loginDto {
  password: string;
  email: string;
}

interface Movie {
  movieId: number;
  title: string;
  overview: string;
  releaseDate: Date;
  average?: number;
  reviews?: Review[];
  genres?: Genre[];
}

interface Genre {
  genreId: number;
  name: string;
}

interface Status {
  statusId: number;
  name: string;
}

interface Review {
  reviewId: number;
  rating: number;
  comment: string;
}

interface WatchlistItem {
  movie: Movie;
  statusId: number; // ← used in select binding
}
