export class ProductCannotBeCreated extends Error {
  constructor() {
    super('Error: Category cannot be empty or Amount cannot be 0.')
  }
}