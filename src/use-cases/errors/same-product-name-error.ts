export class ProductCannotHaveSameName extends Error {
  constructor() {
    super('Error: Product already exists')
  }
}