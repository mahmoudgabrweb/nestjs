import { CountriesService } from './countries.service';
import { Controller } from '@nestjs/common';

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountriesService) {}
}
