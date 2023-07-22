import { CountryController } from './country.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';

describe('CountryController', () => {
  let countryController: CountryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [CountriesService],
    }).compile();

    countryController = app.get<CountryController>(CountryController);
  });
});
