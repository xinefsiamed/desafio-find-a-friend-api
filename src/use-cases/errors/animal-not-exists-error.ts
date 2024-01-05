export class PetNotExistsError extends Error {
  constructor() {
    super("Pet not exists.");
  }
}
