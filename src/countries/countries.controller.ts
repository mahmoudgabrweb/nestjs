import { CountriesService } from './countries.service';
import { Controller } from '@nestjs/common';

@Controller()
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}
}
