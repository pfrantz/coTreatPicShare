import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import {AuthGuard, OptionalAuthGuard} from "../auth/auth.guard";

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(OptionalAuthGuard)
  @Get()
  async findAll() {
    return await this.mediaService.findAll();
  }

  @UseGuards(OptionalAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.mediaService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createMediaDto: CreateMediaDto) {
    return await this.mediaService.create(req?.user?.id, createMediaDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Request() req, @Body() updateMediaDto: UpdateMediaDto) {
    const res = await this.mediaService.update(id, req?.user?.id, updateMediaDto);
    if (res === null) {
      throw new HttpException('Media Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mediaService.remove(+id);
  }
}
