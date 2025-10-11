import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreService } from 'src/genre/genre.service';
import { Review } from 'src/review/entities/review.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private genreService: GenreService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    let movieGenres = await this.genreService.findGenresByIds(
      createMovieDto.genres,
    );
    let movie = {
      title: createMovieDto.title,
      releaseDate: createMovieDto.releaseDate ?? undefined,
      overview: createMovieDto.overview ?? undefined,
      genres: movieGenres,
      poster: createMovieDto.poster ?? undefined,
    };
    console.log(movie);
    const createdMovie = this.movieRepository.create(movie);
    await this.movieRepository.save(createdMovie);
    return createdMovie;
  }

  async findAll() {
    return await this.movieRepository.find({
      relations: ['genres', 'reviews'],
    });
  }

  async findByGenres(genres: number[]) {
    return await this.movieRepository.find({
      relations: ['genres'],
      where: {
        genres: {
          genreId: In(genres),
        },
      },
      order: {
        average: 'DESC',
      },
    });
  }

  async updateMovieAverage(movie: Movie, reviews: Review[]) {
    if (reviews.length === 0) movie.average = 0;
    else {
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      movie.average = sum / reviews.length;
    }
    return await this.movieRepository.save(movie);
  }

  async findOneById(id: number) {
    return await this.movieRepository.findOne({
      where: { movieId: id },
      relations: ['genres', 'reviews', 'reviews.user'],
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { movieId: id },
      relations: ['genres'],
    });

    if (!movie) throw new NotFoundException('Movie not found');

    Object.assign(movie, updateMovieDto);

    if (updateMovieDto.genres && updateMovieDto.genres.length > 0) {
      movie.genres = await this.genreService.findGenresByIds(
        updateMovieDto.genres,
      );
    }

    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const existing = await this.findOneById(id);
    if (!existing)
      throw new BadRequestException('Genre with that id does not exist!');
    else this.movieRepository.remove(existing);
  }

  async getBestRated() {
    let test = await this.movieRepository.find({
      relations: ['genres'],
      order: {
        average: 'DESC',
      },
      take: 5,
    });
    return test;
  }
}
