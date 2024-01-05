export class NGOAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists.");
  }
}
