export interface registerDto {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;
}

export interface updateUserDto {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;
  oldPassword: string;
}
export interface loginDto {
  password: string;
  email: string;
}

export interface Movie {
  movieId: number;
  title: string;
  overview: string;
  releaseDate: Date;
  average?: number;
  reviews?: Review[];
  genres?: Genre[];
}

export interface Genre {
  genreId: number;
  name: string;
}

export interface Status {
  statusId: number;
  name: string;
}

export interface Review {
  reviewId?: number;
  rating: number;
  comment: string;
  movie?: Movie;
}

export interface WatchlistItem {
  watchlistItemId: number;
  movie: Movie;
  status: Status; // ← used in select binding
}

export interface WatchlistItemAndReview {
  watchlistItem: WatchlistItem;
  review: Review;
}
export interface isInWatchlistDTO {
  inWatchlist: boolean;
  watchlistItemId?: number;
}
