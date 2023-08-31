import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dto';
import { TeamNotFoundError } from './errors/team-not-found.error';
import { TeamErrorCreate } from './errors/team-error-create.error';
import { TeamErrorUpdate } from './errors/team-error-update.error';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>
  ) {}

  async findAll(): Promise<Array<TeamDto>> {
    return await this.teamsRepository.find({
      relations: ['country']
    });
  }

  async findOne(id: number): Promise<TeamDto> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['country']
    });
    if (!team) throw new TeamNotFoundError(id);
    return team;
  }

  async create(team: CreateTeamDto): Promise<TeamDto> {
    const createdTeam = await this.teamsRepository.save(
      this.teamsRepository.create(team)
    );
    if (!createdTeam) throw new TeamErrorCreate();
    return createdTeam;
  }

  async update(id: number, team: UpdateTeamDto): Promise<TeamDto> {
    const updatedTeam = await this.teamsRepository.update(id, team);
    if (!updatedTeam) throw new TeamErrorUpdate(id);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}
