import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  async create(statusName: string) {
    const existing = await this.statusRepository.findOne({
      where: { name: statusName },
    });
    if (!existing) {
      const status = this.statusRepository.create({ name: statusName });
      this.statusRepository.save(status);
      return status;
    } else throw new BadRequestException('That status already exists!');
  }

  async findAll() {
    return await this.statusRepository.find();
  }

  async findOne(id: number) {
    return await this.statusRepository.findOne({ where: { statusId: id } });
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    if (!existing)
      throw new BadRequestException('Genre with that id does not exist!');
    else this.statusRepository.remove(existing);
  }
}
