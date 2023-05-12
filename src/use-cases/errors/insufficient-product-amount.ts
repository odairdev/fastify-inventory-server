export class InsufficientProductAmount extends Error {
  constructor() {
    super('Order amount is larger than product amount available.')
  }
}