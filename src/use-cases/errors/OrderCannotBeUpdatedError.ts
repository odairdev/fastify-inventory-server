export class OrderCannotBeUpdatedError extends Error {
  constructor() {
    super('Order cannot be updated due to it being an in order and prodcut amount would be negative.')
  }
}