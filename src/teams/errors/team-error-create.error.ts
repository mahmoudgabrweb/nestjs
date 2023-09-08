export class TeamErrorCreate extends Error {
  constructor() {
    super(`Team has error in creation`);
  }
}
