import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('genre')
@UseGuards(JwtGuard)
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post(':genreName')
  create(@Param('genreName') genreName: string) {
    return this.genreService.create(genreName);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
