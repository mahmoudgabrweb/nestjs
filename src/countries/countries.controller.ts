import { CountriesService } from './countries.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryInterface } from './country.interface';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Get()
  async findAll() {
    const countries: Array<CountryInterface> =
      await this.countryService.findAll();
    return countries;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<CountryInterface | null> {
    return await this.countryService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createCountryDto: CreateCountryDto,
  ): Promise<CountryInterface | string> {
    const country: CountryInterface | null = await this.countryService.create(
      createCountryDto,
    );
    if (!country) {
      return 'Error in saving country';
    }
    return country;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    const country = await this.countryService.update(+id, updateCountryDto);
    return country;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.countryService.remove(+id);
  }
}
