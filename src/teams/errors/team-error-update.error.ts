export class TeamErrorUpdate extends Error {
  constructor(id: number) {
    super(`Team with id: ${id} couldn't been updated!`);
  }
}
