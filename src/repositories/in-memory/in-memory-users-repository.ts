import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";


export class InMemoryUsersRepository implements IUsersRepository {
  public db: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: `user-${Math.floor(Math.random() * 10000)}`,
      ...data,
      created_at: new Date()
    }

    this.db.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.find(u => u.email === email) || null

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.db.find(user => user.id === userId) ?? null

    return user
  }
}