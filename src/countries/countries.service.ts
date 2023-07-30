import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CountryInterface } from './country.interface';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<CountryInterface>,
  ) {}

  findAll(): Promise<CountryInterface[]> {
    return this.countryRepository.find();
  }

  findOne(id: number): Promise<CountryInterface | null> {
    return this.countryRepository.findOneById(id);
  }

  create(country: CountryInterface): Promise<CountryInterface> {
    return this.countryRepository.save(this.countryRepository.create(country));
  }

  update(id: number, country: CountryInterface): Promise<UpdateResult> {
    return this.countryRepository
      .createQueryBuilder()
      .update()
      .set({
        name: country.name,
        logo: country.logo,
      })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number): Promise<DeleteResult> {
    return this.countryRepository
      .createQueryBuilder()
      .delete()
      .from(Country)
      .where('id = :id', { id })
      .execute();
  }
}
