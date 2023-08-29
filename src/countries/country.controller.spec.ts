import { CountriesController } from './countries.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';

describe('CountryController', () => {
  let countryController: CountriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService]
    }).compile();

    countryController = app.get<CountriesController>(CountriesController);
  });
});
