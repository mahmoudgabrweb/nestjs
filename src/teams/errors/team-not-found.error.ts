export class TeamNotFoundError extends Error {
  constructor(id: number) {
    super(`Team with ${id} is not found!`);
  }
}
