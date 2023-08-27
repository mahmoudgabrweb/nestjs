import { CountriesService } from './countries.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryDto, CreateCountryDto, UpdateCountryDto } from './dto';
import { CountryNotFoundError } from './errors/country-not-found.error';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {
  }

  @Get()
  async findAll(): Promise<Array<CountryDto>> {
    const countries: Array<CountryDto> = await this.countryService.findAll();
    return countries;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<CountryDto> {
    try {
      return await this.countryService.findOne(+id);
    } catch (error) {
      if (error instanceof CountryNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async create(
    @Body() createCountryDto: CreateCountryDto
  ): Promise<CountryDto> {
    try {
      const country: CountryDto = await this.countryService.create(
        createCountryDto
      );
      return country;
    } catch (error) {
      throw new InternalServerErrorException('Error while saving country');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto
  ): Promise<CountryDto> {
    try {
      const country = await this.countryService.update(+id, updateCountryDto);
      return country;
    } catch (error) {
      throw new InternalServerErrorException('Could not update country');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.countryService.delete(+id);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete country');
    }
  }
}
