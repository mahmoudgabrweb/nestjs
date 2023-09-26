import { randomUUID } from "crypto";
import { CreateCountryDto } from "src/countries/dto";

export const createMockCountriesCreateDto = ( overrides?: Partial<CreateCountryDto> ): CreateCountryDto => {
    return {
        name: randomUUID(),
        logo: randomUUID(),
        ...overrides
    };
}