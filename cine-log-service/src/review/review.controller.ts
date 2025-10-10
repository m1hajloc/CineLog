import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('review')
@UseGuards(JwtGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Put()
  upsert(@Body() createReviewDto: CreateReviewDto, @GetUser() user: User) {
    return this.reviewService.upsert(createReviewDto, user);
  }

  @Get()
  findAllByUser(@GetUser() user: User) {
    return this.reviewService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOneById(+id);
  }

  @Get('findByMovie/:id')
  findByMovie(@Param('id') id: string) {
    return this.reviewService.findByMovie(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.reviewService.remove(+id);
  }
}
