export class SeasonNotFoundError extends Error {
  constructor(id: number) {
    super(`Season of id: ${id} not found`);
  }
}
