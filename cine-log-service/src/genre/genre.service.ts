import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(@InjectRepository(Genre) private genreRepository: Repository<Genre>){}

  async create(genreName: string) {
    const existing = await this.genreRepository.findOne({where:{name:genreName}});
    if(!existing){
      const genre = this.genreRepository.create({name:genreName});
      this.genreRepository.save(genre);
      return genre;
    }
    else
      throw new BadRequestException('That genre already exists!');
  }

  async findAll() {
    return await this.genreRepository.find();
  }

  async findOne(id: number) {
    return await this.genreRepository.findOne({where:{genreId:id}});
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    if(!existing)
      throw new BadRequestException('Genre with that id does not exist!');
    else
      this.genreRepository.remove(existing);
  }
}
