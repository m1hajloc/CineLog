import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Review } from './entities/review.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>, private movieService: MovieService){};
  
  async create(createReviewDto: CreateReviewDto,user: User) {
    let existingMovie = await this.movieService.findOneById(createReviewDto.movieId);
    if (!existingMovie)
      throw new BadRequestException("Movie doesnt exist!");
    let review = {
      comment:createReviewDto.comment,
      rating:createReviewDto.rating,
      movie:existingMovie,
      user: user
    }
     const createdReview = this.reviewRepository.create(review);
       await this.reviewRepository.save(createdReview);
       return createdReview;
  }
  
    async findAll() {
      return await this.reviewRepository.find();
    }
  
    async findByMovie(movieId:number) {
      return await this.reviewRepository.find({
      where: {
        movie: {
          movieId: movieId
        },
      },
    });;
    }

    async findOneById(reviewId:number){
      return await this.reviewRepository.findOne({where:{reviewId:reviewId}});
    }
  
    async update(id: number, updateReviewDto: UpdateReviewDto) {
      const review = await this.reviewRepository.findOne({
      where: { reviewId: id },
    });
  
    if (!review) throw new NotFoundException('Review not found');
    
    Object.assign(review, updateReviewDto);
  
    return this.reviewRepository.save(review);
    }
  
    async remove(id: number) {
       const existing = await this.findOneById(id);
          if(!existing)
            throw new BadRequestException('Review with that id does not exist!');
          else
            this.reviewRepository.remove(existing);
    }
  }

