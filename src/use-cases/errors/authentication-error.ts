export class AuthenticationError extends Error {
  constructor() {
    super('Unauthorized: Invalid email or Password.')
  }
}