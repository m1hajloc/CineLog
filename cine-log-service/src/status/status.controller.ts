import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('status')
@UseGuards(AuthGuard('jwt'))
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post(':statusName')
  create(@Param('statusName') statusName: string ) {
    return this.statusService.create(statusName);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
  //   return this.genreService.update(+id, updateGenreDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
