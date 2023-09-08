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
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto';
import { TeamsService } from './teams.service';
import { TeamNotFoundError } from './errors/team-not-found.error';
import { TeamErrorCreate } from './errors/team-error-create.error';
import { TeamErrorUpdate } from './errors/team-error-update.error';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  @Get()
  async findAll(): Promise<Array<TeamDto>> {
    const teams: Array<TeamDto> = await this.teamService.findAll();
    return teams;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<TeamDto> {
    try {
      return await this.teamService.findOne(+id);
    } catch (err) {
      if (err instanceof TeamNotFoundError) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    try {
      return await this.teamService.create(createTeamDto);
    } catch (err) {
      if (err instanceof TeamErrorCreate) {
        throw new TeamErrorCreate();
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<TeamDto> {
    try {
      return await this.teamService.update(+id, updateTeamDto);
    } catch (err) {
      if (err instanceof TeamErrorUpdate) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.teamService.delete(+id);
  }
}
