/**
 * Error instance of unauthorised access attempt;
 */
export class UnauthorisedError extends Error {
  date: Date;
  constructor() {
    super('Unauthorised');
    this.date = new Date();
  }
}
