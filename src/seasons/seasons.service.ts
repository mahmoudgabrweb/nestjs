import { Repository } from 'typeorm';
import { Season } from './season.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonDto, SeasonDto, UpdateSeasonDto } from './dto';
import { SeasonNotFoundError } from './errors/season-not-found.error';
import { SeasonErrorCreate } from './errors/season-error-create.error';
import { SeasonErrorUpdate } from './errors/season-error-update.error';

export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private seasonsRepository: Repository<Season>
  ) {}

  async findAll(): Promise<Array<SeasonDto>> {
    return await this.seasonsRepository.find();
  }

  async findOne(id: number): Promise<CreateSeasonDto> {
    const season = await this.seasonsRepository.findOne({
      where: { id }
    });
    if (!season) throw new SeasonNotFoundError(id);
    return season;
  }

  async create(season: CreateSeasonDto): Promise<SeasonDto> {
    const createdSeason = this.seasonsRepository.save(
      this.seasonsRepository.create(season)
    );
    if (!createdSeason) throw new SeasonErrorCreate();
    return createdSeason;
  }

  async update(id: number, season: UpdateSeasonDto): Promise<SeasonDto> {
    const updatedSeason = this.seasonsRepository.update(id, season);
    if (!updatedSeason) throw new SeasonErrorUpdate(id);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    console.log({id})
    await this.seasonsRepository.delete(id);
  }
}
