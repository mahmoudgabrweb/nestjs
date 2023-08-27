export class CountryNotFoundError extends Error {
  constructor(countryId: number) {
    super(`Country with id ${countryId} not found`);
  }
}
