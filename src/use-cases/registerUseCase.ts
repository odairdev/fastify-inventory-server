import { IUsersRepository } from '@/repositories/IUsersRepository'
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor (private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6);
    
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
  
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return user
  }
}
