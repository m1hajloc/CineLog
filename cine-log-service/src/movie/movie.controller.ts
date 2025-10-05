import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AdminGuard } from 'src/auth/decorator/admin.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('movie')
@UseGuards(JwtGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }
  @Post('movieByGenres')
  findAllByGenres(@Body('genres') genres: number[]) {
    return this.movieService.findByGenres(genres);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOneById(+id);
  }

  @Get('bestRated')
  getBestRated() {
    return this.movieService.getBestRated();
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
