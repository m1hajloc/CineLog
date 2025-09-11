import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('genre')
// @UseGuards(AuthGuard('jwt'))
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
  //   return this.genreService.update(+id, updateGenreDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
