import { Repository } from "typeorm";
import { AppModule } from "../../app.module";
import { CountriesService } from "../countries.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Country } from "../country.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createMockCountriesCreateDto } from "../../fixtures/countries.fixtures";

let app: TestingModule;
let countriesService: CountriesService;
let countriesRepository: Repository<Country>;

beforeAll( async () => {
  app = await Test.createTestingModule({
    imports: [ AppModule ]
  }).compile();
  app.init();

  countriesService = app.get(CountriesService);
  countriesRepository = app.get(getRepositoryToken(Country));
} );

afterAll( async () => {
  await app.close();
});

beforeEach( async () => {
  await countriesRepository.delete({});
});

describe('Countries unit tests', () => {
  describe('FindALl', () => {
    it('fetches all the countries from the database', async () => {
      const createdCountry = await countriesRepository.save( createMockCountriesCreateDto() );
      const countries = await countriesService.findAll();
      expect(countries).toHaveLength(1);
      expect(countries).toEqual([
        createdCountry
      ]);
    });
  });
});
