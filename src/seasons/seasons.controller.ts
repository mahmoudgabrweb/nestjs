import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreateSeasonDto, SeasonDto, UpdateSeasonDto } from './dto';
import { SeasonsService } from './seasons.service';
import { SeasonNotFoundError } from './errors/season-not-found.error';
import { SeasonErrorCreate } from './errors/season-error-create.error';
import { SeasonErrorUpdate } from './errors/season-error-update.error';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  async findAll(): Promise<Array<SeasonDto>> {
    const seasons: Array<SeasonDto> = await this.seasonsService.findAll();
    return seasons;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<SeasonDto> {
    try {
      return await this.seasonsService.findOne(+id);
    } catch (error) {
      if (error instanceof SeasonNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async create(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
    try {
      return await this.seasonsService.create(createSeasonDto);
    } catch (error) {
      if (error instanceof SeasonErrorCreate) {
        throw new SeasonErrorCreate();
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeasonDto: UpdateSeasonDto
  ): Promise<SeasonDto> {
    try {
      return await this.seasonsService.update(+id, updateSeasonDto);
    } catch (error) {
      if (error instanceof SeasonErrorUpdate) {
        throw new SeasonErrorUpdate(+id);
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.seasonsService.delete(+id);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete country');
    }
  }
}
