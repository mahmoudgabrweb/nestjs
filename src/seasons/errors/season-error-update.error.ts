export class SeasonErrorUpdate extends Error {
  constructor(id: number) {
    super(`Error while updating season of id: ${id}`);
  }
}
