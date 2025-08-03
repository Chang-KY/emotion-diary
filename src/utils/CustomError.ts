export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;

    // Set the prototype explicitly for TypeScript
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
