import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('status')
@UseGuards(JwtGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post(':statusName')
  create(@Param('statusName') statusName: string) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
