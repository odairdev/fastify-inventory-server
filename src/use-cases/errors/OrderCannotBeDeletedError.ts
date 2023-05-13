export class OrderCannotBeDeletedError extends Error {
  constructor() {
    super('Order cannot be deleted due to it being an in order and prodcut amount would be negative.')
  }
}