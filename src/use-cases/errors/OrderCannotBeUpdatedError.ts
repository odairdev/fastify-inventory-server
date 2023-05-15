export class OrderCannotBeUpdatedError extends Error {
  constructor() {
    super('Order cannot be updated: because this type and amount would make product amount negative.')
  }
}