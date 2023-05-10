export class AuthenticationError extends Error {
  constructor() {
    super('Uaunthorized: Invalid email or Password.')
  }
}