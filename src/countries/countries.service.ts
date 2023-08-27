import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { Repository } from 'typeorm';
import { CountryDto } from './dto/country.dto';
import { CountryNotFoundError } from './errors/country-not-found.error';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<CountryDto[]> {
    return await this.countryRepository.find();
  }

  async findOne(id: number): Promise<CountryDto> {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) throw new CountryNotFoundError(id);
    return country;
  }

  async create(country: CountryDto): Promise<CountryDto> {
    return await this.countryRepository.save(this.countryRepository.create(country));
  }

  async update(id: number, countryDto: CountryDto): Promise<CountryDto> {
    await this.countryRepository.update(id, countryDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
